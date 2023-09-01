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
            autoFocusSearch={true}
            onEmojiClick={(emojiItem) => {
              setIcon(emojiItem.emoji);
              setIsEmojiPickerVisible(false);
            }}
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
