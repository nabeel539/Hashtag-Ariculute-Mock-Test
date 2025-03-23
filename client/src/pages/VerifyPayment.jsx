import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useContext } from "react";
import { StoreContext } from "@/context/StoreContext";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(StoreContext);

  useEffect(() => {
    const verify = async () => {
      const orderId = searchParams.get("razorpay_order_id");
      const paymentId = searchParams.get("razorpay_payment_id");
      const signature = searchParams.get("razorpay_signature");
      const testId = searchParams.get("testId");

      if (!orderId || !paymentId || !signature || !testId) {
        toast.error("Invalid Payment Verification.");
        return navigate("/tests");
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/payment/verifyRazorpay`,
          {
            orderId,
            paymentId,
            signature,
            testId,
          }
        );

        if (response.data.success) {
          toast.success("Payment Verified! You can now access the test.");
          navigate("/dashboard/user");
        } else {
          toast.error("Payment Verification Failed!");
          navigate("/tests");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error verifying payment.");
        navigate("/tests");
      }
    };

    verify();
  }, [navigate, searchParams]);

  return (
    <div className="container text-center py-12">Verifying payment...</div>
  );
};

export default VerifyPayment;
