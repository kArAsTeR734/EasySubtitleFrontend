import type {StepProps} from "../../../../shared/types/types.ts";
import type {FC} from "react";
import About from "../../About";
import DropboxMenu from "../../DropboxMenu";
import AdvantagesButtons from "../../AdvantagesButtons";

export const UploadStep: FC<StepProps> = ({onFileUpload}) => {

  return (
      <>
        <AdvantagesButtons/>
        <DropboxMenu
            onFileUpload={onFileUpload}
            acceptedFileTypes=".wav"
            maxFileSize={500 * 1024 * 1024}
            className="upload-step__dropbox"
        />
        <About/>
      </>
  );
};

