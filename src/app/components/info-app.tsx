import * as Dialog from "@radix-ui/react-dialog";
import { Info, ArrowRight } from "lucide-react";
import { FormattedMessage } from 'react-intl';
import { useState } from "react";

export default function InfoApp() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setCurrentStep(1);
    setIsOpen(false);
  };

  const handleSkip = () => {
    resetAndClose();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setCurrentStep(1);
    }
  };

  const getContent = () => {
    if (currentStep === 1) {
      return {
        title: "Titulo",
        text: "Texto",
        imageSrc: "/assets/images/icons/info-app-places1.svg",
      };
    }
  };

  const { title, text, imageSrc } = getContent() || { title: '', text: '', imageSrc: '' };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button onClick={() => setIsOpen(true)}>
          <Info className="text-[#2C7C89]" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="w-full h-full bg-white fixed bottom-0 left-0 right-0 top-auto z-50">
          <div className="flex flex-col items-center justify-center h-full p-8">
            <img
              src={imageSrc}
              className="w-3/4 max-w-sm"
              alt="InformaciÃ³n"
            />
            <div className="text-center mt-8">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-gray-600 mt-4 text-sm font-normal">
                {text}
              </p>
            </div>
            <div className="flex justify-between w-full mt-8">
              {currentStep < 3 && (
                <button
                  className="text-teal-600 hover:text-teal-700 text-m absolute left-10 bottom-12"
                  onClick={handleSkip}
                >
                  <FormattedMessage id='skipButton.text' defaultMessage='Omitir'/>
                </button>
              )}
              <div className="flex space-x-2 absolute left-1/2 transform -translate-x-1/2"
                style={{ position: "absolute", bottom: "55px"}}
                >
                <span className={`w-2 h-2 ${currentStep === 1 ? 'bg-teal-600' : 'bg-gray-300'} rounded-full`} />
                <span className={`w-2 h-2 ${currentStep === 2 ? 'bg-teal-600' : 'bg-gray-300'} rounded-full`} />
                <span className={`w-2 h-2 ${currentStep === 3 ? 'bg-teal-600' : 'bg-gray-300'} rounded-full`} />
              </div>
              <button
                className="text-teal-600 hover:text-teal-700 text-xl absolute right-10 bottom-12"
                onClick={handleNextStep}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}