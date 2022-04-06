# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2022-04-06
### Added
- Added simple retry policy configuration to superjson schema
- Added `openTime` field to circuit breaker configuration in superjson schema

### Changed
- removed `typescript-is` and replaced it with `ajv` validation
- `isProfileDocumentNode` and `isMapDocumentNode` do full schema validation
- Cleaned up schema types by removing now obsolete `| undefined`.
- Removed `uri-reference` format from `HttpCallNode::url` because it is incorrect and `ajv` is broken with it

### Fixed
- Fixed `AssertionError::detailed` message spreading an already-string message

## [1.1.0] - 2022-01-19
### Added
- Added guards and visit functions for `UseCaseExampleNode` and `ComlinkLiteralNode`
- `serviceId` field to `HttpCallStatementNode`
- `name` field to `EnumValueNode` containing the enum variant name

## [1.0.0] - 2021-11-04
### Added
- `AssertionError` is thrown when `typescript-is` assert function fails.

### Changed
- **BREAKING CHANGE**: `location` and `span` properties merged together
- **BREAKING CHANGE**: `astMetadata` property added to map and profile document
- **BREAKING CHANGE**: `title` and `decsription` properties nested under `documentation` property with added `location` property
- `prepareProviderParameters` helper does not set parameter to default value

## [0.0.34] - 2021-10-14
### Added
- Added `UseCaseExampleNode`
- Added Comlink example nodes `ComlinkPrimitiveLiteralNode`, `ComlinkObjectLiteralNode`, `ComlinkListLiteralNode`, `ComlinkAssignmentNode`

### Changed
- **BREAKING CHANGE**: `UseCaseSlotDefinitionNode` property `type` renamed to `value` and made required

## [0.0.33] - 2021-10-14

## [0.0.32] - 2021-10-14
### Added
- provider.json schemas

## [0.0.31] - 2021-09-29

## [0.0.29] - 2021-09-08

## [0.0.28] - 2021-08-25

## [0.0.27] - 2021-08-03
### Fixed
- `typescript-is` is a runtime dependency

## [0.0.26] - 2021-07-30
### Added
- Map and Profile AST validation with `typescript-is`
- Compile time transformation with `ttypescript`
- JSON Schema generation with `typescript-json-schema`
- Husky for a pre-commit hook

## [0.0.23] - 2021-04-26
### Changed
- Publish to npm

## [0.0.22] - 2021-03-21
### Changed
- Map security requirements

## [0.0.21] - 2021-02-04
### Added
- Added `IterationAtomNode`
- Added `IterationAtomNode` to `CallStatementNode` and `InlineCallNode`
- Added `ConditionAtomNode` to `InlineCallNode`
- Moved `ProfileAstVisitor` and `MapAstVisitor` from sdk package

### Changed
- Renamed `StatementConditionNode` to `ConditionAtomNode`

## [0.0.20] - 2021-01-11
### Added
- `ProfileHeaderNode` to the exported `ProfileASTNode` union
- `MapHeaderNode` to the exported `MapASTNode` union
- Their subsequent utils

### Changed
- `ProfileNode` -> `ProfileHeaderNode`
- `MapNode` -> `MapHeaderNode`
- Start using header node inside `ProfileDocumentNode` and `MapDocumentNode`

### Removed
- `MapProfileIdNode`, `ProviderNode` and `MapNode` from the exported `MapASTNode` union
- `ProfileIdNode` and `ProfileNode` from the exported `ProfileASTNode` union
- Their subsequent utils

## [0.0.19] - 2021-01-04
### Added
- Profile AST utils

## [0.0.18] - 2020-11-28
### Added
- Http map node security scheme

### Changed
- Repository and package name
- Map AST utils

## [0.0.16] - 2020-11-11
### Changed
- Map AST reworked

### Fixed
- Github workflow actions failing due to github security update

## [0.0.15] - 2020-11-02
### Added
- `UseCaseSlotDefinitionNode` to the exported `ProfileASTNode` union

## [0.0.14] - 2020-11-02
### Changed
- Name of the package scope to `@superfaceai`

## [0.0.13] - 2020-09-04
### Added
- `required` field to `FieldDefinitionNode`
- `UseCaseSlotDefinitionNode` to share common info

## [0.0.12] - 2020-08-24
### Added
- `ProfileASTNode` union export

## [0.0.11] - 2020-08-17
### Changed
- Profile AST documentation
- `UseCaseDefinitionNode` result to be optional

## [0.0.10] - 2020-07-16
### Changed
- Profile AST node kinds to be consistent

## [0.0.9] - 2020-07-14
### Changed
- Profile AST node names to be consistent

## [0.0.8] - 2020-07-09
### Added
- Readme
- Map AST utils

### Changed
- New AST profile definition corresponding to the language
- Reuse of `Span` and `Location` types
- Source and sourceMap in jessie expression node is optional
- Response status code type from `string` to `number`

## 0.0.7 - 2020-06-20
### Added
- First AST
- Github workflow publishing

[Unreleased]: https://github.com/superfaceai/ast-js/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/superfaceai/ast-js/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/superfaceai/ast-js/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/superfaceai/ast-js/compare/v0.0.34...v1.0.0
[0.0.34]: https://github.com/superfaceai/ast-js/compare/v0.0.33...v0.0.34
[0.0.33]: https://github.com/superfaceai/ast-js/compare/v0.0.32...v0.0.33
[0.0.32]: https://github.com/superfaceai/ast-js/compare/v0.0.31...v0.0.32
[0.0.31]: https://github.com/superfaceai/ast-js/compare/v0.0.29...v0.0.31
[0.0.29]: https://github.com/superfaceai/ast-js/compare/v0.0.28...v0.0.29
[0.0.28]: https://github.com/superfaceai/ast-js/compare/v0.0.27...v0.0.28
[0.0.27]: https://github.com/superfaceai/ast-js/compare/v0.0.26...v0.0.27
[0.0.26]: https://github.com/superfaceai/ast-js/compare/v0.0.23...v0.0.26
[0.0.23]: https://github.com/superfaceai/ast-js/compare/v0.0.22...v0.0.23
[0.0.22]: https://github.com/superfaceai/ast-js/compare/v0.0.21...v0.0.22
[0.0.21]: https://github.com/superfaceai/ast-js/compare/v0.0.20...v0.0.21
[0.0.20]: https://github.com/superfaceai/ast-js/compare/v0.0.19...v0.0.20
[0.0.19]: https://github.com/superfaceai/ast-js/compare/v0.0.18...v0.0.19
[0.0.18]: https://github.com/superfaceai/ast-js/compare/v0.0.16...v0.0.18
[0.0.16]: https://github.com/superfaceai/ast-js/compare/v0.0.15...v0.0.16
[0.0.15]: https://github.com/superfaceai/ast-js/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/superfaceai/ast-js/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/superfaceai/ast-js/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/superfaceai/ast-js/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/superfaceai/ast-js/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/superfaceai/ast-js/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/superfaceai/ast-js/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/superfaceai/ast-js/compare/v0.0.7...v0.0.8
