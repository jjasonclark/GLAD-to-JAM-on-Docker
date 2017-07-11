'use strict';

module.exports.dig = (source, ...props) => props.reduce((m, p) => (m == null ? null : m[p]), source);
module.exports.isBlank = what => what == null || String(what).trim() === '';
