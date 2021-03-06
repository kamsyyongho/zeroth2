import ENV from '../../services/env';

interface Log {
  file: string;
  caller: string;
  value: unknown;
  important?: boolean;
  trace?: boolean;
  warn?: boolean;
  error?: boolean;
  api?: boolean;
}

/**
 * Custom logging function with custom styling and tracing
 * @param logOptions `file`, `caller`, and `value` are required
 * - Does nothing when in production
 * - options:
 * ```ts
  file: string;
  caller: string;
  value: unknown;
  important?: boolean;
  trace?: boolean;
  warn?: boolean; // console.warn
  error?: boolean; // console.error
 * ```
 */
export default function log(logOptions: Log): void {
  if (ENV.isProduction) return;
  const {
    file = '',
    caller = '',
    value = {},
    important = false,
    trace = false,
    warn = false,
    error = false,
    api = false
  } = logOptions;

  const info = `${file} - ${caller}:`;

  if (trace) console.trace(info);
  if (error) {
    return console.error(info, value);
  }
  if (warn) {
    return console.warn(info, value);
  }
  if (important) {
    console.log(
      `%c${info}`, // everything after the %c is styled
      `color: red; font-weight: bold;`,
      value
    );
  } else if (api) {
    console.log(
      `%c${info}`, // everything after the %c is styled
      `color: teal; font-weight: bold;`,
      value
    );
  } else {
    console.log(info, value);
  }
}
