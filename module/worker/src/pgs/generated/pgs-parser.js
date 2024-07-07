// Generated from /home/runner/work/editor/editor/module/worker/src/pgs/grammar/PGS.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import PGSListener from './pgs-listener.js';
const serializedATN = [4,1,50,365,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,1,0,3,0,52,8,0,1,0,1,0,3,
0,56,8,0,1,0,3,0,59,8,0,1,0,3,0,62,8,0,1,0,5,0,65,8,0,10,0,12,0,68,9,0,1,
0,3,0,71,8,0,1,0,1,0,3,0,75,8,0,3,0,77,8,0,1,0,3,0,80,8,0,1,0,1,0,1,1,1,
1,1,1,3,1,87,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,97,8,2,1,2,1,2,1,3,
1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,109,8,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,
1,4,1,4,1,5,1,5,1,5,1,5,3,5,125,8,5,1,5,1,5,1,6,1,6,1,7,1,7,1,7,3,7,134,
8,7,1,7,3,7,137,8,7,1,7,1,7,3,7,141,8,7,1,7,3,7,144,8,7,1,7,3,7,147,8,7,
1,7,1,7,1,8,1,8,3,8,153,8,8,1,8,1,8,3,8,157,8,8,1,8,5,8,160,8,8,10,8,12,
8,163,9,8,1,9,1,9,1,9,3,9,168,8,9,1,10,1,10,3,10,172,8,10,1,10,1,10,1,10,
3,10,177,8,10,1,10,1,10,1,11,1,11,3,11,183,8,11,1,11,1,11,3,11,187,8,11,
1,11,1,11,3,11,191,8,11,1,11,1,11,1,11,3,11,196,8,11,1,11,1,11,1,12,1,12,
3,12,202,8,12,1,12,1,12,3,12,206,8,12,1,12,1,12,3,12,210,8,12,1,12,1,12,
1,13,1,13,3,13,216,8,13,1,13,1,13,3,13,220,8,13,1,13,1,13,1,14,1,14,3,14,
226,8,14,1,14,3,14,229,8,14,1,14,3,14,232,8,14,1,14,3,14,235,8,14,1,14,3,
14,238,8,14,1,14,3,14,241,8,14,1,15,1,15,1,15,3,15,246,8,15,1,15,1,15,3,
15,250,8,15,1,15,1,15,1,15,1,15,3,15,256,8,15,1,15,1,15,3,15,260,8,15,1,
15,1,15,1,15,1,15,3,15,266,8,15,1,15,1,15,3,15,270,8,15,1,15,1,15,3,15,274,
8,15,1,15,1,15,1,15,3,15,279,8,15,1,15,1,15,3,15,283,8,15,1,15,1,15,1,15,
3,15,288,8,15,1,15,5,15,291,8,15,10,15,12,15,294,9,15,1,16,1,16,3,16,298,
8,16,1,16,1,16,3,16,302,8,16,1,16,1,16,3,16,306,8,16,1,16,3,16,309,8,16,
1,16,3,16,312,8,16,1,16,1,16,1,16,1,16,3,16,318,8,16,1,16,3,16,321,8,16,
1,16,3,16,324,8,16,1,16,3,16,327,8,16,1,17,1,17,3,17,331,8,17,1,17,1,17,
3,17,335,8,17,1,17,5,17,338,8,17,10,17,12,17,341,9,17,1,18,1,18,3,18,345,
8,18,1,18,1,18,1,18,1,18,3,18,351,8,18,1,19,1,19,1,20,1,20,1,21,1,21,1,22,
1,22,1,23,1,23,1,24,1,24,1,24,0,1,30,25,0,2,4,6,8,10,12,14,16,18,20,22,24,
26,28,30,32,34,36,38,40,42,44,46,48,0,3,1,0,37,38,1,0,13,24,1,0,25,29,409,
0,51,1,0,0,0,2,86,1,0,0,0,4,88,1,0,0,0,6,100,1,0,0,0,8,112,1,0,0,0,10,120,
1,0,0,0,12,128,1,0,0,0,14,133,1,0,0,0,16,150,1,0,0,0,18,167,1,0,0,0,20,169,
1,0,0,0,22,180,1,0,0,0,24,199,1,0,0,0,26,213,1,0,0,0,28,228,1,0,0,0,30,265,
1,0,0,0,32,326,1,0,0,0,34,328,1,0,0,0,36,344,1,0,0,0,38,352,1,0,0,0,40,354,
1,0,0,0,42,356,1,0,0,0,44,358,1,0,0,0,46,360,1,0,0,0,48,362,1,0,0,0,50,52,
5,41,0,0,51,50,1,0,0,0,51,52,1,0,0,0,52,53,1,0,0,0,53,66,3,2,1,0,54,56,5,
41,0,0,55,54,1,0,0,0,55,56,1,0,0,0,56,58,1,0,0,0,57,59,5,1,0,0,58,57,1,0,
0,0,58,59,1,0,0,0,59,61,1,0,0,0,60,62,5,41,0,0,61,60,1,0,0,0,61,62,1,0,0,
0,62,63,1,0,0,0,63,65,3,2,1,0,64,55,1,0,0,0,65,68,1,0,0,0,66,64,1,0,0,0,
66,67,1,0,0,0,67,76,1,0,0,0,68,66,1,0,0,0,69,71,5,41,0,0,70,69,1,0,0,0,70,
71,1,0,0,0,71,72,1,0,0,0,72,74,5,1,0,0,73,75,5,41,0,0,74,73,1,0,0,0,74,75,
1,0,0,0,75,77,1,0,0,0,76,70,1,0,0,0,76,77,1,0,0,0,77,79,1,0,0,0,78,80,5,
41,0,0,79,78,1,0,0,0,79,80,1,0,0,0,80,81,1,0,0,0,81,82,5,0,0,1,82,1,1,0,
0,0,83,87,3,4,2,0,84,87,3,6,3,0,85,87,3,8,4,0,86,83,1,0,0,0,86,84,1,0,0,
0,86,85,1,0,0,0,87,3,1,0,0,0,88,89,5,30,0,0,89,90,5,41,0,0,90,91,5,31,0,
0,91,92,5,41,0,0,92,93,5,35,0,0,93,96,5,41,0,0,94,95,5,39,0,0,95,97,5,41,
0,0,96,94,1,0,0,0,96,97,1,0,0,0,97,98,1,0,0,0,98,99,3,20,10,0,99,5,1,0,0,
0,100,101,5,30,0,0,101,102,5,41,0,0,102,103,5,32,0,0,103,104,5,41,0,0,104,
105,5,35,0,0,105,108,5,41,0,0,106,107,5,39,0,0,107,109,5,41,0,0,108,106,
1,0,0,0,108,109,1,0,0,0,109,110,1,0,0,0,110,111,3,22,11,0,111,7,1,0,0,0,
112,113,5,30,0,0,113,114,5,41,0,0,114,115,5,36,0,0,115,116,5,41,0,0,116,
117,5,35,0,0,117,118,5,41,0,0,118,119,3,10,5,0,119,9,1,0,0,0,120,121,3,44,
22,0,121,122,5,41,0,0,122,124,3,12,6,0,123,125,5,41,0,0,124,123,1,0,0,0,
124,125,1,0,0,0,125,126,1,0,0,0,126,127,3,14,7,0,127,11,1,0,0,0,128,129,
7,0,0,0,129,13,1,0,0,0,130,131,5,40,0,0,131,132,5,41,0,0,132,134,3,44,22,
0,133,130,1,0,0,0,133,134,1,0,0,0,134,136,1,0,0,0,135,137,5,41,0,0,136,135,
1,0,0,0,136,137,1,0,0,0,137,138,1,0,0,0,138,140,5,2,0,0,139,141,5,41,0,0,
140,139,1,0,0,0,140,141,1,0,0,0,141,143,1,0,0,0,142,144,3,16,8,0,143,142,
1,0,0,0,143,144,1,0,0,0,144,146,1,0,0,0,145,147,5,41,0,0,146,145,1,0,0,0,
146,147,1,0,0,0,147,148,1,0,0,0,148,149,5,3,0,0,149,15,1,0,0,0,150,161,3,
18,9,0,151,153,5,41,0,0,152,151,1,0,0,0,152,153,1,0,0,0,153,154,1,0,0,0,
154,156,5,4,0,0,155,157,5,41,0,0,156,155,1,0,0,0,156,157,1,0,0,0,157,158,
1,0,0,0,158,160,3,18,9,0,159,152,1,0,0,0,160,163,1,0,0,0,161,159,1,0,0,0,
161,162,1,0,0,0,162,17,1,0,0,0,163,161,1,0,0,0,164,168,3,44,22,0,165,168,
3,20,10,0,166,168,3,22,11,0,167,164,1,0,0,0,167,165,1,0,0,0,167,166,1,0,
0,0,168,19,1,0,0,0,169,171,5,5,0,0,170,172,5,41,0,0,171,170,1,0,0,0,171,
172,1,0,0,0,172,173,1,0,0,0,173,174,3,44,22,0,174,176,3,28,14,0,175,177,
5,41,0,0,176,175,1,0,0,0,176,177,1,0,0,0,177,178,1,0,0,0,178,179,5,6,0,0,
179,21,1,0,0,0,180,182,3,26,13,0,181,183,5,41,0,0,182,181,1,0,0,0,182,183,
1,0,0,0,183,184,1,0,0,0,184,186,3,46,23,0,185,187,5,41,0,0,186,185,1,0,0,
0,186,187,1,0,0,0,187,188,1,0,0,0,188,190,3,24,12,0,189,191,5,41,0,0,190,
189,1,0,0,0,190,191,1,0,0,0,191,192,1,0,0,0,192,193,3,46,23,0,193,195,3,
48,24,0,194,196,5,41,0,0,195,194,1,0,0,0,195,196,1,0,0,0,196,197,1,0,0,0,
197,198,3,26,13,0,198,23,1,0,0,0,199,201,5,7,0,0,200,202,5,41,0,0,201,200,
1,0,0,0,201,202,1,0,0,0,202,203,1,0,0,0,203,205,3,44,22,0,204,206,5,41,0,
0,205,204,1,0,0,0,205,206,1,0,0,0,206,207,1,0,0,0,207,209,3,28,14,0,208,
210,5,41,0,0,209,208,1,0,0,0,209,210,1,0,0,0,210,211,1,0,0,0,211,212,5,8,
0,0,212,25,1,0,0,0,213,215,5,5,0,0,214,216,5,41,0,0,215,214,1,0,0,0,215,
216,1,0,0,0,216,217,1,0,0,0,217,219,3,28,14,0,218,220,5,41,0,0,219,218,1,
0,0,0,219,220,1,0,0,0,220,221,1,0,0,0,221,222,5,6,0,0,222,27,1,0,0,0,223,
225,5,9,0,0,224,226,5,41,0,0,225,224,1,0,0,0,225,226,1,0,0,0,226,227,1,0,
0,0,227,229,3,30,15,0,228,223,1,0,0,0,228,229,1,0,0,0,229,231,1,0,0,0,230,
232,5,41,0,0,231,230,1,0,0,0,231,232,1,0,0,0,232,234,1,0,0,0,233,235,5,33,
0,0,234,233,1,0,0,0,234,235,1,0,0,0,235,237,1,0,0,0,236,238,5,41,0,0,237,
236,1,0,0,0,237,238,1,0,0,0,238,240,1,0,0,0,239,241,3,32,16,0,240,239,1,
0,0,0,240,241,1,0,0,0,241,29,1,0,0,0,242,243,6,15,-1,0,243,245,5,5,0,0,244,
246,5,41,0,0,245,244,1,0,0,0,245,246,1,0,0,0,246,247,1,0,0,0,247,249,3,30,
15,0,248,250,5,41,0,0,249,248,1,0,0,0,249,250,1,0,0,0,250,251,1,0,0,0,251,
252,5,6,0,0,252,266,1,0,0,0,253,255,5,7,0,0,254,256,5,41,0,0,255,254,1,0,
0,0,255,256,1,0,0,0,256,257,1,0,0,0,257,259,3,30,15,0,258,260,5,41,0,0,259,
258,1,0,0,0,259,260,1,0,0,0,260,261,1,0,0,0,261,262,5,8,0,0,262,266,1,0,
0,0,263,266,3,42,21,0,264,266,3,44,22,0,265,242,1,0,0,0,265,253,1,0,0,0,
265,263,1,0,0,0,265,264,1,0,0,0,266,292,1,0,0,0,267,269,10,5,0,0,268,270,
5,41,0,0,269,268,1,0,0,0,269,270,1,0,0,0,270,271,1,0,0,0,271,273,5,10,0,
0,272,274,5,41,0,0,273,272,1,0,0,0,273,274,1,0,0,0,274,275,1,0,0,0,275,291,
3,30,15,6,276,278,10,4,0,0,277,279,5,41,0,0,278,277,1,0,0,0,278,279,1,0,
0,0,279,280,1,0,0,0,280,282,5,11,0,0,281,283,5,41,0,0,282,281,1,0,0,0,282,
283,1,0,0,0,283,284,1,0,0,0,284,291,3,30,15,5,285,287,10,3,0,0,286,288,5,
41,0,0,287,286,1,0,0,0,287,288,1,0,0,0,288,289,1,0,0,0,289,291,5,12,0,0,
290,267,1,0,0,0,290,276,1,0,0,0,290,285,1,0,0,0,291,294,1,0,0,0,292,290,
1,0,0,0,292,293,1,0,0,0,293,31,1,0,0,0,294,292,1,0,0,0,295,297,5,2,0,0,296,
298,5,41,0,0,297,296,1,0,0,0,297,298,1,0,0,0,298,299,1,0,0,0,299,308,3,34,
17,0,300,302,5,41,0,0,301,300,1,0,0,0,301,302,1,0,0,0,302,303,1,0,0,0,303,
305,5,4,0,0,304,306,5,41,0,0,305,304,1,0,0,0,305,306,1,0,0,0,306,307,1,0,
0,0,307,309,5,33,0,0,308,301,1,0,0,0,308,309,1,0,0,0,309,311,1,0,0,0,310,
312,5,41,0,0,311,310,1,0,0,0,311,312,1,0,0,0,312,313,1,0,0,0,313,314,5,3,
0,0,314,327,1,0,0,0,315,317,5,2,0,0,316,318,5,41,0,0,317,316,1,0,0,0,317,
318,1,0,0,0,318,320,1,0,0,0,319,321,5,33,0,0,320,319,1,0,0,0,320,321,1,0,
0,0,321,323,1,0,0,0,322,324,5,41,0,0,323,322,1,0,0,0,323,324,1,0,0,0,324,
325,1,0,0,0,325,327,5,3,0,0,326,295,1,0,0,0,326,315,1,0,0,0,327,33,1,0,0,
0,328,339,3,36,18,0,329,331,5,41,0,0,330,329,1,0,0,0,330,331,1,0,0,0,331,
332,1,0,0,0,332,334,5,4,0,0,333,335,5,41,0,0,334,333,1,0,0,0,334,335,1,0,
0,0,335,336,1,0,0,0,336,338,3,36,18,0,337,330,1,0,0,0,338,341,1,0,0,0,339,
337,1,0,0,0,339,340,1,0,0,0,340,35,1,0,0,0,341,339,1,0,0,0,342,343,5,34,
0,0,343,345,5,41,0,0,344,342,1,0,0,0,344,345,1,0,0,0,345,346,1,0,0,0,346,
347,3,40,20,0,347,348,5,41,0,0,348,350,3,38,19,0,349,351,5,41,0,0,350,349,
1,0,0,0,350,351,1,0,0,0,351,37,1,0,0,0,352,353,5,43,0,0,353,39,1,0,0,0,354,
355,5,43,0,0,355,41,1,0,0,0,356,357,5,43,0,0,357,43,1,0,0,0,358,359,5,43,
0,0,359,45,1,0,0,0,360,361,7,1,0,0,361,47,1,0,0,0,362,363,7,2,0,0,363,49,
1,0,0,0,65,51,55,58,61,66,70,74,76,79,86,96,108,124,133,136,140,143,146,
152,156,161,167,171,176,182,186,190,195,201,205,209,215,219,225,228,231,
234,237,240,245,249,255,259,265,269,273,278,282,287,290,292,297,301,305,
308,311,317,320,323,326,330,334,339,344,350];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class PGSParser extends antlr4.Parser {

    static grammarFileName = "PGS.g4";
    static literalNames = [ null, "';'", "'{'", "'}'", "','", "'('", "')'", 
                            "'['", "']'", "':'", "'|'", "'&'", "'?'", "'-'", 
                            "'\\u00AD'", "'\\u2010'", "'\\u2011'", "'\\u2012'", 
                            "'\\u2013'", "'\\u2014'", "'\\u2015'", "'\\u2212'", 
                            "'\\uFE58'", "'\\uFE63'", "'\\uFF0D'", "'>'", 
                            "'\\u27E9'", "'\\u3009'", "'\\uFE65'", "'\\uFF1E'", 
                            null, null, null, null, null, null, null, null, 
                            null, null, null, null, null, null, null, null, 
                            null, null, null, null, "'0'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, "CREATE", 
                             "NODE", "EDGE", "OPEN", "OPTIONAL", "TYPE", 
                             "GRAPH", "STRICT", "LOOSE", "ABSTRACT", "IMPORTS", 
                             "SP", "WHITESPACE", "StringLiteral", "EscapedChar", 
                             "HexDigit", "Digit", "NonZeroDigit", "NonZeroOctDigit", 
                             "HexLetter", "ZeroDigit" ];
    static ruleNames = [ "pgs", "createType", "createNodeType", "createEdgeType", 
                         "createGraphType", "graphType", "typeForm", "graphTypeDefinition", 
                         "elementTypes", "elementType", "nodeType", "edgeType", 
                         "middleType", "endpointType", "labelPropertySpec", 
                         "labelSpec", "propertySpec", "properties", "property", 
                         "propertyType", "key", "labelName", "typeName", 
                         "dash", "rightArrowHead" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = PGSParser.ruleNames;
        this.literalNames = PGSParser.literalNames;
        this.symbolicNames = PGSParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 15:
    	    		return this.labelSpec_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    labelSpec_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 5);
    		case 1:
    			return this.precpred(this._ctx, 4);
    		case 2:
    			return this.precpred(this._ctx, 3);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	pgs() {
	    let localctx = new PgsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, PGSParser.RULE_pgs);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 51;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 50;
	            this.match(PGSParser.SP);
	        }

	        this.state = 53;
	        this.createType();
	        this.state = 66;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 55;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                if(la_===1) {
	                    this.state = 54;
	                    this.match(PGSParser.SP);

	                }
	                this.state = 58;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===1) {
	                    this.state = 57;
	                    this.match(PGSParser.T__0);
	                }

	                this.state = 61;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===41) {
	                    this.state = 60;
	                    this.match(PGSParser.SP);
	                }

	                this.state = 63;
	                this.createType(); 
	            }
	            this.state = 68;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
	        }

	        this.state = 76;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        if(la_===1) {
	            this.state = 70;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 69;
	                this.match(PGSParser.SP);
	            }

	            this.state = 72;
	            this.match(PGSParser.T__0);
	            this.state = 74;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	            if(la_===1) {
	                this.state = 73;
	                this.match(PGSParser.SP);

	            }

	        }
	        this.state = 79;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 78;
	            this.match(PGSParser.SP);
	        }

	        this.state = 81;
	        this.match(PGSParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	createType() {
	    let localctx = new CreateTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, PGSParser.RULE_createType);
	    try {
	        this.state = 86;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 83;
	            this.createNodeType();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 84;
	            this.createEdgeType();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 85;
	            this.createGraphType();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	createNodeType() {
	    let localctx = new CreateNodeTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, PGSParser.RULE_createNodeType);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 88;
	        this.match(PGSParser.CREATE);
	        this.state = 89;
	        this.match(PGSParser.SP);
	        this.state = 90;
	        this.match(PGSParser.NODE);
	        this.state = 91;
	        this.match(PGSParser.SP);
	        this.state = 92;
	        this.match(PGSParser.TYPE);
	        this.state = 93;
	        this.match(PGSParser.SP);
	        this.state = 96;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===39) {
	            this.state = 94;
	            this.match(PGSParser.ABSTRACT);
	            this.state = 95;
	            this.match(PGSParser.SP);
	        }

	        this.state = 98;
	        this.nodeType();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	createEdgeType() {
	    let localctx = new CreateEdgeTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, PGSParser.RULE_createEdgeType);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 100;
	        this.match(PGSParser.CREATE);
	        this.state = 101;
	        this.match(PGSParser.SP);
	        this.state = 102;
	        this.match(PGSParser.EDGE);
	        this.state = 103;
	        this.match(PGSParser.SP);
	        this.state = 104;
	        this.match(PGSParser.TYPE);
	        this.state = 105;
	        this.match(PGSParser.SP);
	        this.state = 108;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===39) {
	            this.state = 106;
	            this.match(PGSParser.ABSTRACT);
	            this.state = 107;
	            this.match(PGSParser.SP);
	        }

	        this.state = 110;
	        this.edgeType();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	createGraphType() {
	    let localctx = new CreateGraphTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, PGSParser.RULE_createGraphType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 112;
	        this.match(PGSParser.CREATE);
	        this.state = 113;
	        this.match(PGSParser.SP);
	        this.state = 114;
	        this.match(PGSParser.GRAPH);
	        this.state = 115;
	        this.match(PGSParser.SP);
	        this.state = 116;
	        this.match(PGSParser.TYPE);
	        this.state = 117;
	        this.match(PGSParser.SP);
	        this.state = 118;
	        this.graphType();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	graphType() {
	    let localctx = new GraphTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, PGSParser.RULE_graphType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 120;
	        this.typeName();
	        this.state = 121;
	        this.match(PGSParser.SP);
	        this.state = 122;
	        this.typeForm();
	        this.state = 124;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	        if(la_===1) {
	            this.state = 123;
	            this.match(PGSParser.SP);

	        }
	        this.state = 126;
	        this.graphTypeDefinition();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	typeForm() {
	    let localctx = new TypeFormContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, PGSParser.RULE_typeForm);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 128;
	        _la = this._input.LA(1);
	        if(!(_la===37 || _la===38)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	graphTypeDefinition() {
	    let localctx = new GraphTypeDefinitionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, PGSParser.RULE_graphTypeDefinition);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 133;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===40) {
	            this.state = 130;
	            this.match(PGSParser.IMPORTS);
	            this.state = 131;
	            this.match(PGSParser.SP);
	            this.state = 132;
	            this.typeName();
	        }

	        this.state = 136;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 135;
	            this.match(PGSParser.SP);
	        }

	        this.state = 138;
	        this.match(PGSParser.T__1);
	        this.state = 140;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
	        if(la_===1) {
	            this.state = 139;
	            this.match(PGSParser.SP);

	        }
	        this.state = 143;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===5 || _la===43) {
	            this.state = 142;
	            this.elementTypes();
	        }

	        this.state = 146;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 145;
	            this.match(PGSParser.SP);
	        }

	        this.state = 148;
	        this.match(PGSParser.T__2);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	elementTypes() {
	    let localctx = new ElementTypesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, PGSParser.RULE_elementTypes);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 150;
	        this.elementType();
	        this.state = 161;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,20,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 152;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===41) {
	                    this.state = 151;
	                    this.match(PGSParser.SP);
	                }

	                this.state = 154;
	                this.match(PGSParser.T__3);
	                this.state = 156;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===41) {
	                    this.state = 155;
	                    this.match(PGSParser.SP);
	                }

	                this.state = 158;
	                this.elementType(); 
	            }
	            this.state = 163;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,20,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	elementType() {
	    let localctx = new ElementTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, PGSParser.RULE_elementType);
	    try {
	        this.state = 167;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 164;
	            this.typeName();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 165;
	            this.nodeType();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 166;
	            this.edgeType();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nodeType() {
	    let localctx = new NodeTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, PGSParser.RULE_nodeType);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 169;
	        this.match(PGSParser.T__4);
	        this.state = 171;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 170;
	            this.match(PGSParser.SP);
	        }

	        this.state = 173;
	        this.typeName();
	        this.state = 174;
	        this.labelPropertySpec();
	        this.state = 176;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 175;
	            this.match(PGSParser.SP);
	        }

	        this.state = 178;
	        this.match(PGSParser.T__5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	edgeType() {
	    let localctx = new EdgeTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, PGSParser.RULE_edgeType);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 180;
	        this.endpointType();
	        this.state = 182;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 181;
	            this.match(PGSParser.SP);
	        }

	        this.state = 184;
	        this.dash();
	        this.state = 186;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 185;
	            this.match(PGSParser.SP);
	        }

	        this.state = 188;
	        this.middleType();
	        this.state = 190;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 189;
	            this.match(PGSParser.SP);
	        }

	        this.state = 192;
	        this.dash();
	        this.state = 193;
	        this.rightArrowHead();
	        this.state = 195;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 194;
	            this.match(PGSParser.SP);
	        }

	        this.state = 197;
	        this.endpointType();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	middleType() {
	    let localctx = new MiddleTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, PGSParser.RULE_middleType);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 199;
	        this.match(PGSParser.T__6);
	        this.state = 201;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 200;
	            this.match(PGSParser.SP);
	        }

	        this.state = 203;
	        this.typeName();
	        this.state = 205;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,29,this._ctx);
	        if(la_===1) {
	            this.state = 204;
	            this.match(PGSParser.SP);

	        }
	        this.state = 207;
	        this.labelPropertySpec();
	        this.state = 209;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 208;
	            this.match(PGSParser.SP);
	        }

	        this.state = 211;
	        this.match(PGSParser.T__7);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	endpointType() {
	    let localctx = new EndpointTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, PGSParser.RULE_endpointType);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 213;
	        this.match(PGSParser.T__4);
	        this.state = 215;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,31,this._ctx);
	        if(la_===1) {
	            this.state = 214;
	            this.match(PGSParser.SP);

	        }
	        this.state = 217;
	        this.labelPropertySpec();
	        this.state = 219;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===41) {
	            this.state = 218;
	            this.match(PGSParser.SP);
	        }

	        this.state = 221;
	        this.match(PGSParser.T__5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	labelPropertySpec() {
	    let localctx = new LabelPropertySpecContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, PGSParser.RULE_labelPropertySpec);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 228;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===9) {
	            this.state = 223;
	            this.match(PGSParser.T__8);
	            this.state = 225;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 224;
	                this.match(PGSParser.SP);
	            }

	            this.state = 227;
	            this.labelSpec(0);
	        }

	        this.state = 231;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,35,this._ctx);
	        if(la_===1) {
	            this.state = 230;
	            this.match(PGSParser.SP);

	        }
	        this.state = 234;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===33) {
	            this.state = 233;
	            this.match(PGSParser.OPEN);
	        }

	        this.state = 237;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,37,this._ctx);
	        if(la_===1) {
	            this.state = 236;
	            this.match(PGSParser.SP);

	        }
	        this.state = 240;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===2) {
	            this.state = 239;
	            this.propertySpec();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	labelSpec(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new LabelSpecContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 30;
	    this.enterRecursionRule(localctx, 30, PGSParser.RULE_labelSpec, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 265;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,43,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 243;
	            this.match(PGSParser.T__4);
	            this.state = 245;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 244;
	                this.match(PGSParser.SP);
	            }

	            this.state = 247;
	            this.labelSpec(0);
	            this.state = 249;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 248;
	                this.match(PGSParser.SP);
	            }

	            this.state = 251;
	            this.match(PGSParser.T__5);
	            break;

	        case 2:
	            this.state = 253;
	            this.match(PGSParser.T__6);
	            this.state = 255;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 254;
	                this.match(PGSParser.SP);
	            }

	            this.state = 257;
	            this.labelSpec(0);
	            this.state = 259;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 258;
	                this.match(PGSParser.SP);
	            }

	            this.state = 261;
	            this.match(PGSParser.T__7);
	            break;

	        case 3:
	            this.state = 263;
	            this.labelName();
	            break;

	        case 4:
	            this.state = 264;
	            this.typeName();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 292;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,50,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 290;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,49,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new LabelSpecContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, PGSParser.RULE_labelSpec);
	                    this.state = 267;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 269;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===41) {
	                        this.state = 268;
	                        this.match(PGSParser.SP);
	                    }

	                    this.state = 271;
	                    this.match(PGSParser.T__9);
	                    this.state = 273;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===41) {
	                        this.state = 272;
	                        this.match(PGSParser.SP);
	                    }

	                    this.state = 275;
	                    this.labelSpec(6);
	                    break;

	                case 2:
	                    localctx = new LabelSpecContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, PGSParser.RULE_labelSpec);
	                    this.state = 276;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 278;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===41) {
	                        this.state = 277;
	                        this.match(PGSParser.SP);
	                    }

	                    this.state = 280;
	                    this.match(PGSParser.T__10);
	                    this.state = 282;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===41) {
	                        this.state = 281;
	                        this.match(PGSParser.SP);
	                    }

	                    this.state = 284;
	                    this.labelSpec(5);
	                    break;

	                case 3:
	                    localctx = new LabelSpecContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, PGSParser.RULE_labelSpec);
	                    this.state = 285;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 287;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===41) {
	                        this.state = 286;
	                        this.match(PGSParser.SP);
	                    }

	                    this.state = 289;
	                    this.match(PGSParser.T__11);
	                    break;

	                } 
	            }
	            this.state = 294;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,50,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	propertySpec() {
	    let localctx = new PropertySpecContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, PGSParser.RULE_propertySpec);
	    var _la = 0;
	    try {
	        this.state = 326;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,59,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 295;
	            this.match(PGSParser.T__1);
	            this.state = 297;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 296;
	                this.match(PGSParser.SP);
	            }

	            this.state = 299;
	            this.properties();
	            this.state = 308;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,54,this._ctx);
	            if(la_===1) {
	                this.state = 301;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===41) {
	                    this.state = 300;
	                    this.match(PGSParser.SP);
	                }

	                this.state = 303;
	                this.match(PGSParser.T__3);
	                this.state = 305;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===41) {
	                    this.state = 304;
	                    this.match(PGSParser.SP);
	                }

	                this.state = 307;
	                this.match(PGSParser.OPEN);

	            }
	            this.state = 311;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 310;
	                this.match(PGSParser.SP);
	            }

	            this.state = 313;
	            this.match(PGSParser.T__2);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 315;
	            this.match(PGSParser.T__1);
	            this.state = 317;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,56,this._ctx);
	            if(la_===1) {
	                this.state = 316;
	                this.match(PGSParser.SP);

	            }
	            this.state = 320;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===33) {
	                this.state = 319;
	                this.match(PGSParser.OPEN);
	            }

	            this.state = 323;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===41) {
	                this.state = 322;
	                this.match(PGSParser.SP);
	            }

	            this.state = 325;
	            this.match(PGSParser.T__2);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	properties() {
	    let localctx = new PropertiesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, PGSParser.RULE_properties);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 328;
	        this.property();
	        this.state = 339;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,62,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 330;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===41) {
	                    this.state = 329;
	                    this.match(PGSParser.SP);
	                }

	                this.state = 332;
	                this.match(PGSParser.T__3);
	                this.state = 334;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===41) {
	                    this.state = 333;
	                    this.match(PGSParser.SP);
	                }

	                this.state = 336;
	                this.property(); 
	            }
	            this.state = 341;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,62,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	property() {
	    let localctx = new PropertyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, PGSParser.RULE_property);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 344;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===34) {
	            this.state = 342;
	            this.match(PGSParser.OPTIONAL);
	            this.state = 343;
	            this.match(PGSParser.SP);
	        }

	        this.state = 346;
	        this.key();
	        this.state = 347;
	        this.match(PGSParser.SP);
	        this.state = 348;
	        this.propertyType();
	        this.state = 350;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,64,this._ctx);
	        if(la_===1) {
	            this.state = 349;
	            this.match(PGSParser.SP);

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	propertyType() {
	    let localctx = new PropertyTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, PGSParser.RULE_propertyType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 352;
	        this.match(PGSParser.StringLiteral);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	key() {
	    let localctx = new KeyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, PGSParser.RULE_key);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 354;
	        this.match(PGSParser.StringLiteral);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	labelName() {
	    let localctx = new LabelNameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, PGSParser.RULE_labelName);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 356;
	        this.match(PGSParser.StringLiteral);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	typeName() {
	    let localctx = new TypeNameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, PGSParser.RULE_typeName);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 358;
	        this.match(PGSParser.StringLiteral);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	dash() {
	    let localctx = new DashContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 46, PGSParser.RULE_dash);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 360;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 33546240) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	rightArrowHead() {
	    let localctx = new RightArrowHeadContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, PGSParser.RULE_rightArrowHead);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 362;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 1040187392) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

PGSParser.EOF = antlr4.Token.EOF;
PGSParser.T__0 = 1;
PGSParser.T__1 = 2;
PGSParser.T__2 = 3;
PGSParser.T__3 = 4;
PGSParser.T__4 = 5;
PGSParser.T__5 = 6;
PGSParser.T__6 = 7;
PGSParser.T__7 = 8;
PGSParser.T__8 = 9;
PGSParser.T__9 = 10;
PGSParser.T__10 = 11;
PGSParser.T__11 = 12;
PGSParser.T__12 = 13;
PGSParser.T__13 = 14;
PGSParser.T__14 = 15;
PGSParser.T__15 = 16;
PGSParser.T__16 = 17;
PGSParser.T__17 = 18;
PGSParser.T__18 = 19;
PGSParser.T__19 = 20;
PGSParser.T__20 = 21;
PGSParser.T__21 = 22;
PGSParser.T__22 = 23;
PGSParser.T__23 = 24;
PGSParser.T__24 = 25;
PGSParser.T__25 = 26;
PGSParser.T__26 = 27;
PGSParser.T__27 = 28;
PGSParser.T__28 = 29;
PGSParser.CREATE = 30;
PGSParser.NODE = 31;
PGSParser.EDGE = 32;
PGSParser.OPEN = 33;
PGSParser.OPTIONAL = 34;
PGSParser.TYPE = 35;
PGSParser.GRAPH = 36;
PGSParser.STRICT = 37;
PGSParser.LOOSE = 38;
PGSParser.ABSTRACT = 39;
PGSParser.IMPORTS = 40;
PGSParser.SP = 41;
PGSParser.WHITESPACE = 42;
PGSParser.StringLiteral = 43;
PGSParser.EscapedChar = 44;
PGSParser.HexDigit = 45;
PGSParser.Digit = 46;
PGSParser.NonZeroDigit = 47;
PGSParser.NonZeroOctDigit = 48;
PGSParser.HexLetter = 49;
PGSParser.ZeroDigit = 50;

PGSParser.RULE_pgs = 0;
PGSParser.RULE_createType = 1;
PGSParser.RULE_createNodeType = 2;
PGSParser.RULE_createEdgeType = 3;
PGSParser.RULE_createGraphType = 4;
PGSParser.RULE_graphType = 5;
PGSParser.RULE_typeForm = 6;
PGSParser.RULE_graphTypeDefinition = 7;
PGSParser.RULE_elementTypes = 8;
PGSParser.RULE_elementType = 9;
PGSParser.RULE_nodeType = 10;
PGSParser.RULE_edgeType = 11;
PGSParser.RULE_middleType = 12;
PGSParser.RULE_endpointType = 13;
PGSParser.RULE_labelPropertySpec = 14;
PGSParser.RULE_labelSpec = 15;
PGSParser.RULE_propertySpec = 16;
PGSParser.RULE_properties = 17;
PGSParser.RULE_property = 18;
PGSParser.RULE_propertyType = 19;
PGSParser.RULE_key = 20;
PGSParser.RULE_labelName = 21;
PGSParser.RULE_typeName = 22;
PGSParser.RULE_dash = 23;
PGSParser.RULE_rightArrowHead = 24;

class PgsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_pgs;
    }

	createType = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(CreateTypeContext);
	    } else {
	        return this.getTypedRuleContext(CreateTypeContext,i);
	    }
	};

	EOF() {
	    return this.getToken(PGSParser.EOF, 0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterPgs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitPgs(this);
		}
	}


}



class CreateTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_createType;
    }

	createNodeType() {
	    return this.getTypedRuleContext(CreateNodeTypeContext,0);
	};

	createEdgeType() {
	    return this.getTypedRuleContext(CreateEdgeTypeContext,0);
	};

	createGraphType() {
	    return this.getTypedRuleContext(CreateGraphTypeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterCreateType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitCreateType(this);
		}
	}


}



class CreateNodeTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_createNodeType;
    }

	CREATE() {
	    return this.getToken(PGSParser.CREATE, 0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	NODE() {
	    return this.getToken(PGSParser.NODE, 0);
	};

	TYPE() {
	    return this.getToken(PGSParser.TYPE, 0);
	};

	nodeType() {
	    return this.getTypedRuleContext(NodeTypeContext,0);
	};

	ABSTRACT() {
	    return this.getToken(PGSParser.ABSTRACT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterCreateNodeType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitCreateNodeType(this);
		}
	}


}



class CreateEdgeTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_createEdgeType;
    }

	CREATE() {
	    return this.getToken(PGSParser.CREATE, 0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	EDGE() {
	    return this.getToken(PGSParser.EDGE, 0);
	};

	TYPE() {
	    return this.getToken(PGSParser.TYPE, 0);
	};

	edgeType() {
	    return this.getTypedRuleContext(EdgeTypeContext,0);
	};

	ABSTRACT() {
	    return this.getToken(PGSParser.ABSTRACT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterCreateEdgeType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitCreateEdgeType(this);
		}
	}


}



class CreateGraphTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_createGraphType;
    }

	CREATE() {
	    return this.getToken(PGSParser.CREATE, 0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	GRAPH() {
	    return this.getToken(PGSParser.GRAPH, 0);
	};

	TYPE() {
	    return this.getToken(PGSParser.TYPE, 0);
	};

	graphType() {
	    return this.getTypedRuleContext(GraphTypeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterCreateGraphType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitCreateGraphType(this);
		}
	}


}



class GraphTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_graphType;
    }

	typeName() {
	    return this.getTypedRuleContext(TypeNameContext,0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	typeForm() {
	    return this.getTypedRuleContext(TypeFormContext,0);
	};

	graphTypeDefinition() {
	    return this.getTypedRuleContext(GraphTypeDefinitionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterGraphType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitGraphType(this);
		}
	}


}



class TypeFormContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_typeForm;
    }

	STRICT() {
	    return this.getToken(PGSParser.STRICT, 0);
	};

	LOOSE() {
	    return this.getToken(PGSParser.LOOSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterTypeForm(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitTypeForm(this);
		}
	}


}



class GraphTypeDefinitionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_graphTypeDefinition;
    }

	IMPORTS() {
	    return this.getToken(PGSParser.IMPORTS, 0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	typeName() {
	    return this.getTypedRuleContext(TypeNameContext,0);
	};

	elementTypes() {
	    return this.getTypedRuleContext(ElementTypesContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterGraphTypeDefinition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitGraphTypeDefinition(this);
		}
	}


}



class ElementTypesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_elementTypes;
    }

	elementType = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ElementTypeContext);
	    } else {
	        return this.getTypedRuleContext(ElementTypeContext,i);
	    }
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterElementTypes(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitElementTypes(this);
		}
	}


}



class ElementTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_elementType;
    }

	typeName() {
	    return this.getTypedRuleContext(TypeNameContext,0);
	};

	nodeType() {
	    return this.getTypedRuleContext(NodeTypeContext,0);
	};

	edgeType() {
	    return this.getTypedRuleContext(EdgeTypeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterElementType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitElementType(this);
		}
	}


}



class NodeTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_nodeType;
    }

	typeName() {
	    return this.getTypedRuleContext(TypeNameContext,0);
	};

	labelPropertySpec() {
	    return this.getTypedRuleContext(LabelPropertySpecContext,0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterNodeType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitNodeType(this);
		}
	}


}



class EdgeTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_edgeType;
    }

	endpointType = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(EndpointTypeContext);
	    } else {
	        return this.getTypedRuleContext(EndpointTypeContext,i);
	    }
	};

	dash = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DashContext);
	    } else {
	        return this.getTypedRuleContext(DashContext,i);
	    }
	};

	middleType() {
	    return this.getTypedRuleContext(MiddleTypeContext,0);
	};

	rightArrowHead() {
	    return this.getTypedRuleContext(RightArrowHeadContext,0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterEdgeType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitEdgeType(this);
		}
	}


}



class MiddleTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_middleType;
    }

	typeName() {
	    return this.getTypedRuleContext(TypeNameContext,0);
	};

	labelPropertySpec() {
	    return this.getTypedRuleContext(LabelPropertySpecContext,0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterMiddleType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitMiddleType(this);
		}
	}


}



class EndpointTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_endpointType;
    }

	labelPropertySpec() {
	    return this.getTypedRuleContext(LabelPropertySpecContext,0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterEndpointType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitEndpointType(this);
		}
	}


}



class LabelPropertySpecContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_labelPropertySpec;
    }

	labelSpec() {
	    return this.getTypedRuleContext(LabelSpecContext,0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	OPEN() {
	    return this.getToken(PGSParser.OPEN, 0);
	};

	propertySpec() {
	    return this.getTypedRuleContext(PropertySpecContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterLabelPropertySpec(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitLabelPropertySpec(this);
		}
	}


}



class LabelSpecContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_labelSpec;
    }

	labelSpec = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(LabelSpecContext);
	    } else {
	        return this.getTypedRuleContext(LabelSpecContext,i);
	    }
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	labelName() {
	    return this.getTypedRuleContext(LabelNameContext,0);
	};

	typeName() {
	    return this.getTypedRuleContext(TypeNameContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterLabelSpec(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitLabelSpec(this);
		}
	}


}



class PropertySpecContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_propertySpec;
    }

	properties() {
	    return this.getTypedRuleContext(PropertiesContext,0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	OPEN() {
	    return this.getToken(PGSParser.OPEN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterPropertySpec(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitPropertySpec(this);
		}
	}


}



class PropertiesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_properties;
    }

	property = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(PropertyContext);
	    } else {
	        return this.getTypedRuleContext(PropertyContext,i);
	    }
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterProperties(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitProperties(this);
		}
	}


}



class PropertyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_property;
    }

	key() {
	    return this.getTypedRuleContext(KeyContext,0);
	};

	SP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(PGSParser.SP);
	    } else {
	        return this.getToken(PGSParser.SP, i);
	    }
	};


	propertyType() {
	    return this.getTypedRuleContext(PropertyTypeContext,0);
	};

	OPTIONAL() {
	    return this.getToken(PGSParser.OPTIONAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterProperty(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitProperty(this);
		}
	}


}



class PropertyTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_propertyType;
    }

	StringLiteral() {
	    return this.getToken(PGSParser.StringLiteral, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterPropertyType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitPropertyType(this);
		}
	}


}



class KeyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_key;
    }

	StringLiteral() {
	    return this.getToken(PGSParser.StringLiteral, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterKey(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitKey(this);
		}
	}


}



class LabelNameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_labelName;
    }

	StringLiteral() {
	    return this.getToken(PGSParser.StringLiteral, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterLabelName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitLabelName(this);
		}
	}


}



class TypeNameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_typeName;
    }

	StringLiteral() {
	    return this.getToken(PGSParser.StringLiteral, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterTypeName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitTypeName(this);
		}
	}


}



class DashContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_dash;
    }


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterDash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitDash(this);
		}
	}


}



class RightArrowHeadContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PGSParser.RULE_rightArrowHead;
    }


	enterRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.enterRightArrowHead(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PGSListener ) {
	        listener.exitRightArrowHead(this);
		}
	}


}




PGSParser.PgsContext = PgsContext; 
PGSParser.CreateTypeContext = CreateTypeContext; 
PGSParser.CreateNodeTypeContext = CreateNodeTypeContext; 
PGSParser.CreateEdgeTypeContext = CreateEdgeTypeContext; 
PGSParser.CreateGraphTypeContext = CreateGraphTypeContext; 
PGSParser.GraphTypeContext = GraphTypeContext; 
PGSParser.TypeFormContext = TypeFormContext; 
PGSParser.GraphTypeDefinitionContext = GraphTypeDefinitionContext; 
PGSParser.ElementTypesContext = ElementTypesContext; 
PGSParser.ElementTypeContext = ElementTypeContext; 
PGSParser.NodeTypeContext = NodeTypeContext; 
PGSParser.EdgeTypeContext = EdgeTypeContext; 
PGSParser.MiddleTypeContext = MiddleTypeContext; 
PGSParser.EndpointTypeContext = EndpointTypeContext; 
PGSParser.LabelPropertySpecContext = LabelPropertySpecContext; 
PGSParser.LabelSpecContext = LabelSpecContext; 
PGSParser.PropertySpecContext = PropertySpecContext; 
PGSParser.PropertiesContext = PropertiesContext; 
PGSParser.PropertyContext = PropertyContext; 
PGSParser.PropertyTypeContext = PropertyTypeContext; 
PGSParser.KeyContext = KeyContext; 
PGSParser.LabelNameContext = LabelNameContext; 
PGSParser.TypeNameContext = TypeNameContext; 
PGSParser.DashContext = DashContext; 
PGSParser.RightArrowHeadContext = RightArrowHeadContext; 
