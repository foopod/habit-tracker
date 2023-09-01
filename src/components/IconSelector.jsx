import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./IconSelector.css";
import { Button } from "./Button";

export const IconSelector = ({ icon, setIcon }) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  return (
    <>
      <label htmlFor="icon">Icon</label>
      <div
        id="icon"
        onClick={() => {
          setIsEmojiPickerVisible(true);
        }}
      >
        <span>{icon}</span>
      </div>
      {isEmojiPickerVisible && (
        <div className="emoji-container">
          <EmojiPicker
            searchDisabled={true}
            onEmojiClick={(emojiItem) => {
              setIcon(emojiItem.emoji);
              setIsEmojiPickerVisible(false);
            }}
            previewConfig={{ showPreview: false }}
            height={300}
          />
          <div className="close-button-container">
            <Button
              onClick={() => {
                setIsEmojiPickerVisible(false);
              }}
              text="Close"
            ></Button>
          </div>
        </div>
      )}
    </>
  );
};
