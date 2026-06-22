ALTER TABLE "calls" ADD COLUMN "duration_ms" integer;--> statement-breakpoint
ALTER TABLE "calls" ADD COLUMN "stt_model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "calls" ADD COLUMN "llm_model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "calls" ADD COLUMN "tts_model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "calls" ADD COLUMN "stt_cost" numeric(12,6);--> statement-breakpoint
ALTER TABLE "calls" ADD COLUMN "llm_cost" numeric(12,6);--> statement-breakpoint
ALTER TABLE "calls" ADD COLUMN "tts_cost" numeric(12,6);--> statement-breakpoint
ALTER TABLE "calls" ADD COLUMN "telephony_cost" numeric(12,6);--> statement-breakpoint
ALTER TABLE "calls" ADD COLUMN "platform_cost" numeric(12,6);