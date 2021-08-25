import {
  DocumentType,
  inferDocumentType,
  isMapFile,
  isProfileFile,
  isUnknownFile,
} from './document';

describe('when infering document type', () => {
  it('infers document type correctly', () => {
    expect(inferDocumentType('TesT.suma ')).toEqual(DocumentType.MAP);
    expect(inferDocumentType('TesT.supr ')).toEqual(DocumentType.PROFILE);
    expect(inferDocumentType('TesT.suma.ast.json ')).toEqual(
      DocumentType.MAP_AST
    );
    expect(inferDocumentType('TesT.supr.ast.json ')).toEqual(
      DocumentType.PROFILE_AST
    );
    expect(inferDocumentType('TesT.json ')).toEqual(DocumentType.UNKNOWN);
    expect(inferDocumentType('TesT.suma ')).toEqual(DocumentType.MAP);

    expect(isProfileFile('TesT.suma ')).toEqual(false);
    expect(isProfileFile('TesT.supr ')).toEqual(true);

    expect(isMapFile('TesT.suma ')).toEqual(true);
    expect(isMapFile('TesT.supr ')).toEqual(false);

    expect(isUnknownFile('TesT.json ')).toEqual(true);
    expect(isUnknownFile('TesT.supr ')).toEqual(false);
  });
});
