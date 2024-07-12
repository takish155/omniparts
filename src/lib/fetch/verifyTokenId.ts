import { caller } from "@/server";
import { TRPCError } from "@trpc/server";

const verifyTokenId = async (username: string, tokenId: string) => {
  try {
    const data = await caller.account.verifyTokenId({
      tokenId,
      username,
    });

    return data;
  } catch (err) {
    if (err instanceof TRPCError) {
      return {
        status: err.code,
        message: err.message,
      };
    }
  }
};

export default verifyTokenId;
