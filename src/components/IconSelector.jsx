import { useContext, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./IconSelector.css";
import { Button } from "./Button";
import { EmojiStyle } from "emoji-picker-react";
import { ThemeContext } from "../context/ThemeContext";

export const IconSelector = ({ icon, setIcon }) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
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
            emojiStyle={EmojiStyle.NATIVE}
            emojiVersion={0.6}
            theme={theme === "dark" ? "dark" : "light"}
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
