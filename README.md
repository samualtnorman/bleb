# Better LEB128
bleb

[![Lint](https://github.com/samualtnorman/bleb/actions/workflows/lint.yml/badge.svg)](https://github.com/samualtnorman/bleb/actions/workflows/lint.yml) [![Publish](https://github.com/samualtnorman/bleb/actions/workflows/publish.yml/badge.svg)](https://github.com/samualtnorman/bleb/actions/workflows/publish.yml)

| Range             | bleb    | LEB128  |
|-------------------|---------|---------|
| 0 - 127           | 1 byte  | 1 byte  |
| 128 - 16383       | 2 bytes | 2 bytes |
| 16384 - 16511     | 2 bytes | 3 bytes |
| 16512 - 2097151   | 3 bytes | 3 bytes |
| 2097152 - 2113663 | 3 bytes | 4 bytes |
| ... |
