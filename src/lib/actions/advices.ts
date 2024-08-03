"use server";

import { AdviceModel } from "@/lib/db/advices";

export const getPublicAdvices = async () => {
  try {
    const advices = await AdviceModel.find();
    return JSON.parse(JSON.stringify(advices));
  } catch (e: any) {
    console.error(e);
    return {
      fail: true,
      success: false,
      message: "Hubo un error al obtener los consejos publicos",
    };
  }
};
