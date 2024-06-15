export const pgSchemeExamples = [
  {
    name: 'Fraud graph example',
    code:
      'CREATE GRAPH TYPE FraudGraphType LOOSE {\n' +
      '  (PersonType: Person {name STRING}),\n' +
      '  (CustomerType: PersonType & Customer {c_id INT32}),\n' +
      '  (CreditCardType: CreditCard {cc_num STRING}),\n' +
      '  (TransactionType: Transaction {cc_num STRING}),\n' +
      '  (AccountType: Account {acct_id INT32}),\n' +
      '  (:CustomerType)-[OwnsAccountType: owns]->(:AccountType),\n' +
      '  (:CustomerType)-[UsesCreditCardType: uses]->(:CreditCardType),\n' +
      '  (:TransactionType)-[ChargesCreditCardType: charge {amount DOUBLE}]->(:CreditCardType),\n' +
      '  (:TransactionType)-[ActivityType: deposit|withdraw {time DATETIME}]->(:AccountType)\n' +
      '}\n',
  },
  {
    name: 'Catalog graph example',
    code:
      'CREATE GRAPH TYPE CatalogGraphType STRICT {\n' +
      '  (CatalogType: Catalog {id INT}),\n' +
      '  (DataResourceType: DataResource),\n' +
      '  (DatabaseType: DataResourceType {path STRING, owner STRING}),\n' +
      '  (TableType: DataResourceType {id INT, name STRING}),\n' +
      '  (ColumnType: DataResourceType {id INT, name STRING, dataType STRING}),\n' +
      '  (GraphType: DataResourceType {id INT, name STRING}),\n' +
      '  (:CatalogType)-[HasResourceType: hasResource {since DATE}]->(:DataResourceType),\n' +
      '  (:DataResourceType)-[DerivedFromType: derivedFrom {since DATE}]->(:DataResourceType),\n' +
      '  (:DatabaseType)-[HasTableType: hasTable {since DATE}]->(:TableType),\n' +
      '  (:TableType)-[HasColumnType: hasColumn {since DATE}]->(:ColumnType)\n' +
      '}\n',
  },
  {
    name: 'Create graph example with optional in node',
    code:
      'CREATE GRAPH TYPE Test STRICT {\n' +
      '  (PersonType: Person\n' +
      '    {name STRING, OPTIONAL birthday DATE})\n' +
      '}\n',
  },
  {
    name: 'Buddy edge example',
    code:
      'CREATE GRAPH TYPE Test STRICT {\n' +
      '  (:EmployeeType)-[BuddyType: FriendType {since DATE, casual BOOL}]->(:EmployeeType)\n' +
      '}\n',
  },
  {
    name: 'Friend edge type with & and | pipes example',
    code:
      'CREATE GRAPH TYPE Test LOOSE {\n' +
      '  (:PersonType|CustomerType)-[FriendType: Knows & Likes {since DATE}]->(:PersonType|CustomerType)\n' +
      '}\n',
  },
  {
    name: 'Person customer inheritance example',
    code:
      'CREATE GRAPH TYPE Test LOOSE {\n' +
      '  (CustomerType: Person & Customer\n' +
      '    {name STRING, OPTIONAL since DATE})\n' +
      '}\n',
  },
  {
    name: 'Imports example',
    code:
      'CREATE GRAPH TYPE fraudGraphType STRICT IMPORTS socialGraphType {}\n\n',
  },
  {
    name: 'Edge type example',
    code:
      'CREATE EDGE TYPE\n' +
      '  (:CustomerType)-[OwnsAccountType: owns]->(:AccountType)\n',
  },
  {
    name: 'Abstract node example',
    code: 'CREATE NODE TYPE ABSTRACT (salariedType { salary INT })\n\n',
  },
  {
    name: 'Node type example',
    code:
      'CREATE NODE TYPE (personType: Person {name STRING , OPTIONAL birthday DATE})\n\n',
  },
];
