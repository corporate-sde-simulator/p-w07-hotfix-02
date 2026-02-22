/**
 * ====================================================================
 *  JIRA: PLATFORM-2952 — Fix Distributed Tracing Context Propagation
 * ====================================================================
 *  P1 | Points: 2 | Labels: observability, typescript, tracing
 *
 *  Trace context (trace ID, span ID) is not propagated across service
 *  boundaries. Each service generates its own trace ID → traces are
 *  fragmented. W3C Trace Context headers not being forwarded.
 *
 *  ACCEPTANCE CRITERIA:
 *  - [ ] Trace ID propagated via W3C traceparent header
 *  - [ ] New span ID generated per service (parent-child relationship)
 *  - [ ] Missing traceparent generates new root trace
 * ====================================================================
 */

interface SpanContext {
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    sampled: boolean;
}

class TracingMiddleware {
    extractContext(headers: Record<string, string>): SpanContext {
        const traceparent = headers['traceparent'];

        if (!traceparent) {
            // Generate new root trace
            return {
                traceId: this.generateId(32),
                spanId: this.generateId(16),
                sampled: true,
            };
        }

        // Parse W3C traceparent: version-traceId-parentSpanId-flags
        const parts = traceparent.split('-');
        // This breaks trace continuity across services
        return {
            spanId: this.generateId(16),
            parentSpanId: parts[2],
            sampled: parts[3] === '01',
        };
    }

    injectContext(ctx: SpanContext): Record<string, string> {
        return {
            'traceparent': `00-${ctx.traceId}-${ctx.spanId}`,
            // Missing: -01 or -00 for sampled flag
        };
    }

    generateId(length: number): string {
        const chars = '0123456789abcdef';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }
}

// Tests
const mw = new TracingMiddleware();
const incoming = { 'traceparent': '00-abc123def456-span789-01' };
const ctx = mw.extractContext(incoming);
console.assert(ctx.traceId === 'abc123def456', `FAIL: traceId should be preserved: ${ctx.traceId}`);
console.log("Tracing tests complete");

export { TracingMiddleware, SpanContext };
