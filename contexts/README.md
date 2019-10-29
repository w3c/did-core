# DID Contexts

## Background

JSON-LD Context versioning (and schema versioning in general) is a complex 
topic, involving the need to balance security with developer convenience.

On one end of the spectrum, some use cases require cryptographically bound and 
immutable contexts, and will need to enforce immutability at the code level
(for example, by using a content-addressable URL scheme such as the in-progress 
[Hashlink](https://tools.ietf.org/html/draft-sporny-hashlink-03) spec, by
forcing the resolution of a given URL to a known hard-coded embedded context,
or any other appropriate mechanism).

On the opposite end of the spectrum, developers that can tolerate the fact that
the DID context is still changing (in the Credentials Community Group and the 
forthcoming DID Working Group), may want a way to just say "I want to use the
latest in-progress `@context`", without constraining the versions.

And between the two extremes, some developers may want to use strongly versioned
contexts (without necessarily cryptographically binding assurance).

## DID Context Versions

The current system for DID context versioning is:

1. Use `https://www.w3.org/2019/did/v1` as an alias to the latest version of the
  spec. Once the DID Working Group work concludes, the final v1 version will be
  frozen and made immutable.
2. Use intermediate pre-v1 versioned URLs such as `https://w3id.org/did/v0.11`
  if you need to refer to a specific context version.
3. Use additional immutability enforcement mechanisms if your use case requires 
  it.

Contexts will be versioned according to a modified Semantic Versioning scheme.

Before v1.0 (minted at the end of the Working Group process), **all changes to
the context will be marked as BREAKING changes**, by incrementing the minor
`v0.x` version, with no patch component.

## Changelog

### v0.11 - `https://w3id.org/did/v0.11`

Start of changelog
