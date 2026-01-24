import { WHITELIST_DOMAIN } from 'src/common/constants/whitelist-domain';

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || WHITELIST_DOMAIN.includes(origin))
      // Nếu url có trong list hoặc là null thì cho phép
      callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  optionsSuccessStatus: 200,

  // Cho phép nhận cookie từ request
  credentials: true,
};
