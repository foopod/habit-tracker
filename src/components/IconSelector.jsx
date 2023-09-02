import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./IconSelector.css";
import { Button } from "./Button";
import { EmojiStyle } from "emoji-picker-react";

export const IconSelector = ({ icon, setIcon }) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  return (
    <>
    <div>
      <label htmlFor="icon">Icon</label>
      <div
        id="icon"
        onClick={() => {
          setIsEmojiPickerVisible(true);
        }}
      >
        <span>{icon}</span>
      </div>
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
            emojiStyle={EmojiStyle.NATIVE}
            emojiVersion={0.6}
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
