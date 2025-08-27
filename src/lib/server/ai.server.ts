import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });
const model = "gemini-2.5-flash";

export const Prompt = {
  extractAmount: async (text: string) => {
    const response = await ai.models.generateContent({
      model,
      contents: `
    Tôi đang làm 1 ứng ghi chép thu chi, có tính năng tự động đồng bộ các giao dịch có gửi mail về để tự động tạo giao dịch trong ứng
    Đây đây là 1 mail của Ngân hàng sau khi phát sinh giao dịch, tôi đã trích xuất ra và cần bạn trả về tổng số tiền mà người dùng đã sử dụng trong giao dịch
    Kết quả trả về tôi muốn là 1 số tiền dương, không cần format, không cần đơn vị
    
    Mail: ${text}
    `,
      config: {
        responseJsonSchema: {
          type: "object",
          properties: {
            amount: { type: "number" },
          },
        },
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || "").amount;
  },
};
