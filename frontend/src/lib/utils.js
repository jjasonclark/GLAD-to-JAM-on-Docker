export const dig = (source, ...props) => props.reduce((m, p) => (m == null ? null : m[p]), source);
