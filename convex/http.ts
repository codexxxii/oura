import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

import { verifyWebhook } from "@clerk/backend/webhooks";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",

  handler: httpAction(async (ctx, request) => {
    let event;

    try {
      event = await verifyWebhook(request, {
        signingSecret: process.env.CLERK_WEBHOOK_SECRET!,
      });
    } catch (error) {
      console.error("Webhook verification failed:", error);

      return new Response("Invalid webhook", {
        status: 400,
      });
    }

    console.log("Received Clerk event:", event.type);

    try {
      switch (event.type) {
        case "user.created":
        case "user.updated": {
          const user = event.data;

          const email =
            user.email_addresses.find(
              (e) => e.id === user.primary_email_address_id,
            )?.email_address ??
            user.email_addresses[0]?.email_address ??
            "";

          await ctx.runMutation(internal.users.upsertFromClerk, {
            clerkId: user.id,
            email,
            firstName: user.first_name ?? undefined,
            lastName: user.last_name ?? undefined,
            imageUrl: user.image_url ?? undefined,
            createdAt: user.created_at,
          });

          break;
        }

        case "user.deleted": {
          if (event.data.id) {
            await ctx.runMutation(internal.users.deleteFromClerk, {
              clerkId: event.data.id,
            });
          }

          break;
        }
      }

      return new Response("Webhook processed", {
        status: 200,
      });
    } catch (error) {
      console.error("Webhook processing failed:", error);

      return new Response("Webhook processing failed", {
        status: 500,
      });
    }
  }),
});

export default http;
