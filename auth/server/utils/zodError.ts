import { z } from "zod";
export const throwZodError = (error: any) => {
  if (error instanceof z.ZodError) {
    throw {
      data: {
        message: error.errors[0].message,
        statusCode: 400,
      },
    };
  }
  throw {
    data: {
      message: "Invalid input",
      statusCode: 400,
    },
  };
};
