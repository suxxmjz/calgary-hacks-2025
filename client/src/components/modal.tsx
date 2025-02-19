import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { JSX } from "react";

interface ModalProps {
  readonly isOpen: boolean;
  readonly header?: string;
  readonly subHeader?: string;
  readonly content?: JSX.Element;
  readonly onClose: () => void;
  readonly showCloseButton?: boolean;
  readonly width?: string;
  readonly minWidth?: string;
}

export function Modal({
  isOpen,
  header,
  subHeader,
  content,
  onClose,
  width = "w-[90%] md:max-w-lg",
  minWidth,
}: ModalProps): JSX.Element {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${width} ${minWidth} max-h-[95vh] overflow-hidden`}
      >
        <DialogHeader>
          <DialogTitle className="text-left text-header text-base">
            {header}
          </DialogTitle>
          <DialogDescription className="text-left text-accentText text-sm">
            {subHeader}
          </DialogDescription>
        </DialogHeader>
        {content && (
          <div className="mb-2 mt-2 overflow-y-auto max-h-[94vh]">
            {content}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
