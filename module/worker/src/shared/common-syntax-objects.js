import { SyntaxType } from '$worker/shared/const/syntax-type';

const COMMENT_BLOCK_REGEX = /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/g;
const COMMENT_REGEX = /(^|[^\\:])\/\/.*/g;
const STRING_REGEX = /(["'`])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g;

export class CommonSyntaxObjects {
  static C_LIKE_COMMENT = {
    pattern: [
      {
        pattern: COMMENT_BLOCK_REGEX.toString(),
        greedy: true,
      },
      {
        pattern: COMMENT_REGEX.toString(),
        greedy: true,
      },
    ],
    syntaxType: SyntaxType.COMMENT,
  };

  static STRING = {
    pattern: {
      pattern: STRING_REGEX.toString(),
      greedy: true,
    },
    syntaxType: SyntaxType.STRING,
  };
}
