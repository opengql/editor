grammar PGS;

pgs
    :  SP? createType ( SP? ';'? SP? createType)* ( SP? ';' SP? )? SP? EOF ;

createType
    : createNodeType | createEdgeType | createGraphType ;

createNodeType
    : CREATE SP NODE SP TYPE SP (ABSTRACT SP)? nodeType ;

createEdgeType
    : CREATE SP EDGE SP TYPE SP (ABSTRACT SP)? edgeType ;

createGraphType
    : CREATE SP GRAPH SP TYPE SP graphType ;

graphType
    : typeName SP typeForm SP? graphTypeDefinition;

typeForm
    : STRICT | LOOSE ;

graphTypeDefinition
    : (IMPORTS SP typeName)? SP? '{' SP? elementTypes? SP? '}';

elementTypes
    :  elementType (SP? ',' SP? elementType)* ;

elementType
    : typeName | nodeType | edgeType ;

nodeType
    : '(' SP? typeName labelPropertySpec SP? ')' ;

edgeType
    : endpointType SP? dash SP? middleType SP? dash rightArrowHead SP? endpointType ;

middleType
    : '[' SP? typeName SP? labelPropertySpec SP? ']' ;

endpointType
    : '(' SP? labelPropertySpec SP? ')' ;

labelPropertySpec
    : (':' SP? labelSpec)? SP? OPEN? SP? propertySpec? ;

labelSpec
    : '(' SP? labelSpec SP? ')'
    | '[' SP? labelSpec SP? ']'
    | labelSpec SP? '|' SP? labelSpec
    | labelSpec SP? '&' SP? labelSpec
    | labelSpec SP? '?'
    | labelName
    | typeName
    ;

propertySpec
    : '{' SP? properties ( SP? ',' SP? OPEN )? SP? '}'
    | '{' SP? OPEN? SP? '}'
    ;

properties : property ( SP? ',' SP? property )* ;

property : (OPTIONAL SP)? key SP propertyType SP? ;

propertyType : StringLiteral ;

key : StringLiteral ;

labelName :  StringLiteral ;

typeName : StringLiteral ;


CREATE : ( 'c' | 'C' ) ( 'r' | 'R' ) ( 'e' | 'E' ) ( 'a' | 'A' ) ( 't' | 'T' ) ( 'e' | 'E' ) ;
NODE : ( 'n' | 'N' ) ( 'o' | 'O' ) ( 'd' | 'D' ) ( 'e' | 'E' ) ;
EDGE : ( 'e' | 'E' ) ( 'd' | 'D' ) ( 'g' | 'G' ) ( 'e' | 'E' ) ;
OPEN : ( 'o' | 'O' ) ( 'p' | 'P' ) ( 'e' | 'E' ) ( 'n' | 'N' ) ;
OPTIONAL : ( 'o' | 'O' ) ( 'p' | 'P' ) ( 't' | 'T' ) ( 'i' | 'I' ) ( 'o' | 'O' ) ( 'n' | 'N' ) ( 'a' | 'A' ) ( 'l' | 'L' ) ;
TYPE : ( 't' | 'T' ) ( 'y' | 'Y' ) ( 'p' | 'P' ) ( 'e' | 'E' ) ;
GRAPH : ( 'g' | 'G' ) ( 'r' | 'R' ) ( 'a' | 'A' ) ( 'p' | 'P' ) ( 'h' | 'H' ) ;
STRICT : ( 's' | 'S' ) ( 't' | 'T' ) ( 'r' | 'R' ) ( 'i' | 'I' ) ( 'c' | 'C' ) ( 't' | 'T' ) ;
LOOSE : ( 'l' | 'L' ) ( 'o' | 'O' ) ( 'o' | 'O' ) ( 's' | 'S' ) ( 'e' | 'E' ) ;
ABSTRACT : ( 'a' | 'A' ) ( 'b' | 'B' ) ( 's' | 'S' ) ( 't' | 'T' ) ( 'r' | 'R' ) ( 'a' | 'A' ) ( 'c' | 'C' ) ( 't' | 'T' ) ;
IMPORTS : ( 'i' | 'I' ) ( 'm' | 'M' ) ( 'p' | 'P' ) ( 'o' | 'O' ) ( 'r' | 'R' ) ( 't' | 'T' ) ( 's' | 'S' ) ;

SP
    :  ( WHITESPACE )+ ;

WHITESPACE
    :           SPACE
              | TAB
              | LF
              | VT
              | FF
              | CR
              | FS
              | GS
              | RS
              | US
              | '\u1680'
              | '\u180e'
              | '\u2000'
              | '\u2001'
              | '\u2002'
              | '\u2003'
              | '\u2004'
              | '\u2005'
              | '\u2006'
              | '\u2008'
              | '\u2009'
              | '\u200a'
              | '\u2028'
              | '\u2029'
              | '\u205f'
              | '\u3000'
              | '\u00a0'
              | '\u2007'
              | '\u202f'
                            ;

fragment FF : [\f] ;

fragment EscapedSymbolicName_0 : ~[`] ;

fragment RS : [\u001E] ;

fragment StringLiteral_1 : ~['\\] ;
fragment GS : [\u001D] ;
fragment FS : [\u001C] ;
fragment CR : [\r] ;
fragment SPACE : [ ] ;
fragment TAB : [\t] ;
fragment StringLiteral_0 : ~["\\] ;
fragment LF : [\n] ;
fragment VT : [\u000B] ;
fragment US : [\u001F] ;
StringLiteral : ('A'.. 'Z' | 'a'..'z' | '0'..'9' | '_' | '-' )+ ;
EscapedChar
           :  '\\' ( '\\' | '\'' | '"' | ( ( 'B' | 'b' ) ) | ( ( 'F' | 'f' ) ) | ( ( 'N' | 'n' ) ) | ( ( 'R' | 'r' ) ) | ( ( 'T' | 't' ) ) | ( ( ( 'U' | 'u' ) ) ( HexDigit HexDigit HexDigit HexDigit ) ) | ( ( ( 'U' | 'u' ) ) ( HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit ) ) ) ;

HexDigit
        :  Digit
            | HexLetter
            ;

Digit
     :  ZeroDigit
         | NonZeroDigit
         ;

NonZeroDigit
            :  NonZeroOctDigit
                | '8'
                | '9'
                ;

NonZeroOctDigit
               :  '1'
                   | '2'
                   | '3'
                   | '4'
                   | '5'
                   | '6'
                   | '7'
                   ;

HexLetter
         :  ( ( 'A' | 'a' ) )
             | ( ( 'B' | 'b' ) )
             | ( ( 'C' | 'c' ) )
             | ( ( 'D' | 'd' ) )
             | ( ( 'E' | 'e' ) )
             | ( ( 'F' | 'f' ) )
             ;

ZeroDigit
         :  '0' ;

dash
    :  '-'
        | '\u00ad'
        | '\u2010'
        | '\u2011'
        | '\u2012'
        | '\u2013'
        | '\u2014'
        | '\u2015'
        | '\u2212'
        | '\ufe58'
        | '\ufe63'
        | '\uff0d'
        ;

rightArrowHead
  :  '>'
  | '\u27e9'
  | '\u3009'
  | '\ufe65'
  | '\uff1e'
  ;
