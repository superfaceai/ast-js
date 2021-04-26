## [Unreleased]

## [0.0.23] - 2021-04-26

### Changed
* Publish to npm

## [0.0.22] - 2021-03-21

### Changed
* Map security requirements

## [0.0.21] - 2021-02-04

### Added
* Added `IterationAtomNode`
* Added `IterationAtomNode` to `CallStatementNode` and `InlineCallNode`
* Added `ConditionAtomNode` to `InlineCallNode`
* Moved `ProfileAstVisitor` and `MapAstVisitor` from sdk package

### Changed
* Renamed `StatementConditionNode` to `ConditionAtomNode`

## [0.0.20] - 2021-01-11

### Added
* `ProfileHeaderNode` to the exported `ProfileASTNode` union
* `MapHeaderNode` to the exported `MapASTNode` union
* Their subsequent utils

### Changed
* `ProfileNode` -> `ProfileHeaderNode`
* `MapNode` -> `MapHeaderNode`
* Start using header node inside `ProfileDocumentNode` and `MapDocumentNode`

### Removed
* `MapProfileIdNode`, `ProviderNode` and `MapNode` from the exported `MapASTNode` union
* `ProfileIdNode` and `ProfileNode` from the exported `ProfileASTNode` union
* Their subsequent utils

## [0.0.19] - 2021-01-04

### Added
* Profile AST utils

## [0.0.18] - 2020-11-28

### Added
* Http map node security scheme

### Changed
* Repository and package name
* Map AST utils

## [0.0.16] - 2020-11-11

### Changed
* Map AST reworked

### Fixed
* Github workflow actions failing due to github security update

## [0.0.15] - 2020-11-02

### Added
* `UseCaseSlotDefinitionNode` to the exported `ProfileASTNode` union

## [0.0.14] - 2020-11-02

### Changed
* Name of the package scope to `@superfaceai`

## [0.0.13] - 2020-09-04

### Added
* `required` field to `FieldDefinitionNode`
* `UseCaseSlotDefinitionNode` to share common info

## [0.0.12] - 2020-08-24

### Added
* `ProfileASTNode` union export

## [0.0.11] - 2020-08-17

### Changed
* Profile AST documentation
* `UseCaseDefinitionNode` result to be optional

## [0.0.10] - 2020-07-16

### Changed
* Profile AST node kinds to be consistent

## [0.0.9] - 2020-07-14

### Changed
* Profile AST node names to be consistent

## [0.0.8] - 2020-07-09

### Added
* Readme
* Map AST utils

### Changed
* New AST profile definition corresponding to the language
* Reuse of `Span` and `Location` types
* Source and sourceMap in jessie expression node is optional
* Response status code type from `string` to `number`

## [0.0.7] - 2020-06-20

### Added
* First AST
* Github workflow publishing

[Unreleased]: https://github.com/superfaceai/ast-js/compare/v0.0.20...HEAD
[0.0.20]: http://github.com/superfaceai/ast-js/compare/v0.0.19...v0.0.20
[0.0.19]: http://github.com/superfaceai/ast-js/compare/v0.0.18...v0.0.19
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
[0.0.7]: https://github.com/superfaceai/ast-js/releases/tag/v0.0.7