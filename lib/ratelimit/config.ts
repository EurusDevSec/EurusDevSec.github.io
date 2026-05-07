// lib/ratelimit/config.ts
// Rate limiting configuration for different endpoints

export const RATE_LIMITS = {
  // Auth endpoints - strict
  login: {
    requests: 5,          // 5 attempts
    window: 15 * 60,      // per 15 minutes
    message: 'Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau 15 phút.'
  },
  register: {
    requests: 3,          // 3 attempts
    window: 60 * 60,      // per 1 hour
    message: 'Quá nhiều lần đăng ký. Vui lòng thử lại sau 1 giờ.'
  },
  
  // Comment endpoints - moderate
  comment: {
    requests: 10,         // 10 comments
    window: 60,           // per 1 minute
    message: 'Bạn đăng bài quá nhanh. Vui lòng chờ một chút.'
  },
  
  // API endpoints - standard
  api: {
    requests: 100,        // 100 requests
    window: 60,           // per 1 minute
    message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.'
  },
  
  // Public endpoints - loose
  public: {
    requests: 1000,       // 1000 requests
    window: 60,           // per 1 minute (IP-based)
    message: 'Quá nhiều yêu cầu từ IP của bạn.'
  }
}

export type RateLimitKey = keyof typeof RATE_LIMITS
