export const successResponse = ({
  message,
  data,
}: {
  message: string;
  data?: any;
}) => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = ({ message }: { message: string }) => {
  return {
    success: false,
    message,
  };
};
