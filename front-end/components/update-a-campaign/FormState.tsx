import { CheckCircle } from "lucide-react";
import React from "react";
import Loader from "@/components/shared/Loader";

export interface States {
  isSubmitting: boolean;
  first: boolean;
  second: boolean;
  third: boolean;
}

interface FormStatesProps {
  formStates: States;
}

interface StatusViewProps {
  status: boolean;
}

const StatusView = ({ status }: StatusViewProps) => {
  if (status) {
    return <CheckCircle className="w-6 h-6 text-green-500" />;
  } else {
    return <Loader size="24" />;
  }
};

const FormState = ({ formStates }: FormStatesProps) => {
  const { isSubmitting, first, second, third } = formStates;
  return (
    <>
      {isSubmitting && (
        <div className="flex flex-col space-y-3 w-full h-full py-3">
          <div className="flex flex-row items-start justify-start space-x-3">
            <StatusView status={first} />
            <span className="m-body-base text-neutral-base">
              Uploading your assets
            </span>
          </div>
          <div className="flex flex-row items-start justify-start space-x-3">
            <StatusView status={second} />
            <span className="m-body-base text-neutral-base">
              Creating the campaign
            </span>
          </div>
          <div className="flex flex-row items-start justify-start space-x-3">
            <StatusView status={third} />
            <span className="m-body-base text-neutral-base">
              Sign the transaction
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default FormState;
