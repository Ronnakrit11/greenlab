import TelegramBot from 'node-telegram-bot-api';
import { formatInTimeZone } from 'date-fns-tz';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN) {
  console.warn('TELEGRAM_BOT_TOKEN is not defined - notifications will be disabled');
}

if (!TELEGRAM_CHAT_ID) {
  console.warn('TELEGRAM_CHAT_ID is not defined - notifications will be disabled');
}

// Initialize bot without polling
const bot = TELEGRAM_BOT_TOKEN ? new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false }) : null;

// Helper function to validate chat ID
function validateAndFormatChatId(chatId: string | undefined): string | null {
  if (!chatId) return null;
  
  // Remove any whitespace
  chatId = chatId.trim();
  
  // Ensure it starts with a minus sign for group chats
  if (!chatId.startsWith('-')) {
    chatId = `-${chatId}`;
  }
  
  // Validate that it's a valid number
  if (!/^-?\d+$/.test(chatId)) {
    console.error('Invalid chat ID format');
    return null;
  }
  
  return chatId;
}

export async function sendOrderNotification(orderData: {
  orderNumber: string;
  customerName: string;
  email: string;
  tel: string;
  address: string;
  totalAmount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}) {
  // If bot is not initialized or chat ID is missing, skip notification
  if (!bot || !TELEGRAM_CHAT_ID) {
    console.log('Telegram notifications are disabled - missing configuration');
    return;
  }

  const validChatId = validateAndFormatChatId(TELEGRAM_CHAT_ID);
  if (!validChatId) {
    console.error('Invalid Telegram chat ID format');
    return;
  }

  try {
    const currentTime = formatInTimeZone(new Date(), 'Asia/Bangkok', 'dd/MM/yyyy HH:mm:ss');
    
    const message = `
🛍 *New Order Received!*
⏰ *Time:* ${currentTime} 

*Order Number:* \`${orderData.orderNumber}\`
*Customer:* ${orderData.customerName}
*Email:* ${orderData.email}
*Phone:* ${orderData.tel}
*Address:* ${orderData.address}

*Items:*
${orderData.items.map(item => `• ${item.name} x${item.quantity} (${item.price} THB)`).join('\n')}

*Total Amount:* ${orderData.totalAmount.toFixed(2)} THB

*Payment Method:* Cash on Delivery (COD)
*Status:* Pending
    `;

    // First try to get chat information
    try {
      await bot.getChat(validChatId);
    } catch (chatError: any) {
      console.error('Failed to get chat information:', {
        error: chatError.message,
        description: chatError.response?.body?.description
      });
      return;
    }

    // Send the message
    await bot.sendMessage(validChatId, message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });
    
    console.log('Telegram notification sent successfully');
  } catch (error: any) {
    // Log error details but don't throw
    console.error('Failed to send Telegram notification:', {
      error: error.message,
      code: error.code,
      description: error.response?.body?.description,
      chatId: validChatId
    });
    
    // Don't throw the error to prevent order creation failure
    // Just log it since Telegram notification is not critical
  }
}