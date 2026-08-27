import type { APIRoute } from 'astro';
import { z } from 'zod';

import {
  localizedPath,
  t,
  type Locale,
} from '../../i18n/utils';
import {
  createSquareClient,
  getSquareConfig,
  isOrderingEnabled,
  type SquareEnvironmentSource,
} from '../../lib/square';

export const prerender = false;

const checkoutSchema = z.object({
  items: z
    .array(
      z
        .object({
          variationId: z.string().trim().min(1),
          qty: z.number().int().min(1).max(20),
        })
        .strip(),
    )
    .min(1)
    .max(30),
  name: z.string().trim().min(1).max(60),
  locale: z.enum(['en', 'es']),
});

function textResponse(message: string, status: number): Response {
  return new Response(message, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

function localeFromForm(form: FormData): Locale {
  return form.get('locale') === 'es' ? 'es' : 'en';
}

function safeErrorDetails(error: unknown): {
  name: string;
  statusCode?: number;
} {
  const details: { name: string; statusCode?: number } = {
    name: error instanceof Error ? error.name : 'UnknownError',
  };

  if (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number'
  ) {
    details.statusCode = error.statusCode;
  }

  return details;
}

function redirectTo(path: string, origin: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL(path, origin).toString(),
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const requestOrigin = new URL(request.url).origin;
  const runtimeEnvironment: SquareEnvironmentSource = process.env;
  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return textResponse(t('en', 'error.validation'), 400);
  }

  const requestedLocale = localeFromForm(form);

  if (!isOrderingEnabled(runtimeEnvironment)) {
    return textResponse(
      t(requestedLocale, 'error.orderingDisabled'),
      503,
    );
  }

  const rawItems = form.get('items');
  let items: unknown;

  try {
    items =
      typeof rawItems === 'string' ? (JSON.parse(rawItems) as unknown) : null;
  } catch {
    return textResponse(t(requestedLocale, 'error.validation'), 400);
  }

  const parsed = checkoutSchema.safeParse({
    items,
    name: form.get('name'),
    locale: form.get('locale'),
  });

  if (!parsed.success) {
    return textResponse(t(requestedLocale, 'error.validation'), 400);
  }

  const { items: orderItems, name, locale } = parsed.data;
  const errorPath = localizedPath(locale, '/order/error');

  try {
    const config = getSquareConfig(runtimeEnvironment);
    const client = createSquareClient(runtimeEnvironment);

    if (!config || !client) {
      throw new Error('Square ordering credentials are unavailable.');
    }

    const thanksUrl = new URL(
      localizedPath(locale, '/order/thanks'),
      requestOrigin,
    );
    thanksUrl.searchParams.set('name', name);

    const response = await client.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId: config.locationId,
        lineItems: orderItems.map((item) => ({
          catalogObjectId: item.variationId,
          quantity: String(item.qty),
        })),
        fulfillments: [
          {
            type: 'PICKUP',
            state: 'PROPOSED',
            pickupDetails: {
              recipient: {
                displayName: name,
              },
              scheduleType: 'ASAP',
              note: 'Order from website',
            },
          },
        ],
      },
      checkoutOptions: {
        redirectUrl: thanksUrl.toString(),
        askForShippingAddress: false,
        allowTipping: true,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          cashAppPay: true,
        },
      },
    });

    const paymentUrl = response.paymentLink?.url;

    if (!paymentUrl || new URL(paymentUrl).protocol !== 'https:') {
      throw new Error('Square did not return a secure payment link.');
    }

    return new Response(null, {
      status: 303,
      headers: {
        Location: paymentUrl,
      },
    });
  } catch (error) {
    console.error('Square checkout failed.', safeErrorDetails(error));
    return redirectTo(errorPath, requestOrigin);
  }
};
