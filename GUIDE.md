# Learning Guide - TypeScript

> **Welcome to Product-Track Week 7, Hotfix 2!**
> This is a **hotfix task** - a single file that needs urgent bug fixes.
> Hotfixes simulate real production emergencies where you need to fix code quickly.

---

## What You Need To Do (Summary)

1. **Read the comments** at the top of `tracingMiddleware.ts` - they describe the problem
2. **Read** this guide to learn the TypeScript syntax you'll need
3. **Find the bugs** (search for `BUG` comments in the code)
4. **Fix each bug** using the hints provided
5. **Run the tests** (if included at the bottom of the file)

---

## TypeScript Quick Reference

TypeScript is JavaScript with **types** added. If you know JavaScript, you know 90% of TypeScript.

### Variables and Types
```typescript
const name: string = "Alice";        // string type
let count: number = 42;              // number type
const items: number[] = [1, 2, 3];   // array of numbers
const isActive: boolean = true;      // boolean type

// TypeScript can also infer types (you don't always need to write them):
const name = "Alice";                // TS knows this is a string
```

### Interfaces (Define the shape of an object)
```typescript
interface User {
    name: string;
    age: number;
    email?: string;     // ? means optional
}

const user: User = { name: "Alice", age: 25 };
```

### Functions
```typescript
function greet(name: string, greeting: string = "Hello"): string {
    return ${greeting}, !;
}

// Arrow function with types:
const add = (a: number, b: number): number => a + b;
```

### Classes
```typescript
class Calculator {
    private history: number[] = [];     // private = only accessible inside class

    add(a: number, b: number): number {
        const result = a + b;
        this.history.push(result);
        return result;
    }

    getHistory(): number[] {
        return [...this.history];
    }
}

// Using it:
const calc = new Calculator();
calc.add(2, 3);

// Exporting:
export { Calculator };

// Importing:
import { Calculator } from './Calculator';
```

### Common Types
```typescript
// Record (typed dictionary)
const config: Record<string, any> = { key: "value" };

// Union types (can be one of several types)
let status: "active" | "inactive" | "pending" = "active";

// any (disables type checking - avoid when possible)
let data: any = "could be anything";

// null checks
function process(input: string | null): string {
    if (!input) return "empty";
    return input.toUpperCase();
}
```

### Error Handling
```typescript
try {
    const result = riskyOperation();
} catch (error) {
    console.error(Error: );
}
```

### How to Run Tests
```bash
# From the task folder:
npx jest tests/ --verbose

# Or:
npm test
```

### How to Add a Test
```typescript
test('should do something specific', () => {
    const obj = new MyClass();
    const result = obj.process({ key: 'value' });
    expect(result).not.toBeNull();
    expect(result?.success).toBe(true);
});
```

---

## Project Structure

This is a **hotfix** - everything is in one file:

| File | Purpose |
|------|---------|
| `tracingMiddleware.ts` | The code with bugs - **fix this file** |
| `GUIDE.md` | This learning guide |

---

## Incident Reports

### Bug #1
**User Report / Alert:**
> "Always generates new traceId instead of using the one from header"

**Error Log Snippet:**
```
[ERROR] Exception in module -- Unexpected behavior detected.
```

**Approach hint:** The stack trace and user report suggest an issue in this file. Investigate the execution flow to identify the root cause.



### Bug #2
**User Report / Alert:**
> "Should be parts[1]"

**Error Log Snippet:**
```
[ERROR] Exception in module -- Unexpected behavior detected.
```

**Approach hint:** The stack trace and user report suggest an issue in this file. Investigate the execution flow to identify the root cause.



### Bug #3
**User Report / Alert:**
> "Wrong format â€” should be version-traceId-spanId-flags"

**Error Log Snippet:**
```
[ERROR] Exception in module -- Unexpected behavior detected.
```

**Approach hint:** The stack trace and user report suggest an issue in this file. Investigate the execution flow to identify the root cause.



---

## How to Approach This

1. **Read the top comment block** in `tracingMiddleware.ts` carefully - it has:
   - The JIRA ticket description (what's happening in production)
   - Slack thread (discussion about the problem)
   - Acceptance criteria (checklist of what needs to work)
2. **Search for `BUG`** in the file to find each bug location
3. **Read the surrounding code** to understand what it's trying to do
4. **Fix the logic** based on the bug description
5. **Check the tests** at the bottom of the file and make sure they pass

---

## Common Mistakes to Avoid

- Don't change the structure of the code - only fix the buggy logic
- Read **all** the bugs before starting - sometimes fixing one helps you understand another
- Pay attention to the Slack thread comments - they often contain hints about the root cause
