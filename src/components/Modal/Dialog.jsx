import React from "react";
import Button from "../Button/Button";
import Controls from "../controls/Controls";
import Modal from "./components/Modal";
import { UseForm, Form } from "../controls/UseForm";
import TableControls from "../Table/TableControls";

const initializeValue = {
  inputField: "",
  dropDown: "",
};

const options = [
  { id: "1", value: "Option 1" },
  { id: "2", value: "Option 2" },
  { id: "3", value: "Option 3" },
  { id: "4", value: "Option 4" },
  { id: "5", value: "Option 5" },
];

const demoMessage = `result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification
result Message information notification result Message
information notification result Message information notification`;

export default function Dialog({ closeModal }) {
  const { values, handleInputChange } = UseForm(initializeValue);
  return (
    <>
      {/* W A R N I N G:: Don't use the wrapper div in your component this parent two div modify for this page only */}
      <div className="modal-overlay overlay py-24 text-white ">
        {/* CLOSE -- BUTTON */}
        <div className="text-4xl fixed top-10 right-12 z-50">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="content-m flex-col gap-y-16 min-h-full">
          {/* Dialog-Component-1 START */}
          <h1 className="font-bold text-lg">Dialog-Component-1 START</h1>
          {/* Showing Part 1 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title" />
            <Modal.Body></Modal.Body>
            {/* Dialog Footer section for Button and error. */}
            {/* !!!! Parent div use grid css when you use one button in on column then use --> col-span-2 */}
          </div>
          {/* Showing Part 2 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title" />
            <Modal.Body></Modal.Body>
            <Modal.Footer error="error message error message error message error message error message">
              <Button title="w-100% Positive" className="col-span-2" />
            </Modal.Footer>
          </div>
          {/* Showing Part 3 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title" />
            <Modal.Body></Modal.Body>
            <Modal.Footer error="error message error message error message error message error message">
              <Button
                title="w-100% Negative"
                className="col-span-2"
                colorType="bg-orange-300"
                hoverColorType="hover:bg-orange-400"
              />
            </Modal.Footer>
          </div>

          {/* Showing Part 4 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title" />
            <Modal.Body></Modal.Body>
            <Modal.Footer error="error message error message error message error message error message">
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
            </Modal.Footer>
          </div>

          {/* Showing Part 5 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title Area Title" />
            <Modal.Body></Modal.Body>
            <Modal.Footer error="error message error message error message error message">
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
            </Modal.Footer>
          </div>
          {/* Dialog-Component-1 END */}
          <h1 className="font-bold text-lg">Dialog-Component-2 START</h1>
          {/**
           *
           * Dialog Component-2
           * 30/05/2022
           *
           */}
          {/* Dialog-Component-2 START */}
          {/* Showing Part 1 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Bottom button w-50% Positive 2 lines MIX" />
            <Modal.Body></Modal.Body>
            <Modal.Footer error="error message error message error message error message">
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
              <Button
                title="w-100% Negative"
                className="col-span-2"
                colorType="bg-orange-300"
                hoverColorType="hover:bg-orange-400"
              />
            </Modal.Footer>
          </div>
          {/* Showing Part 2 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Bottom button w-50% Positive 2 lines MIX With message" />
            <Modal.Body>
              <p>{demoMessage}</p>
            </Modal.Body>
            <Modal.Footer error="error message error message error message error message">
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
              <Button
                title="w-100% Negative"
                className="col-span-2"
                colorType="bg-orange-300"
                hoverColorType="hover:bg-orange-400"
              />
            </Modal.Footer>
          </div>
          {/* Showing Part 3 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Bottom button w-50% Positive 2 lines MIX With FORM" />
            <Modal.Body>
              <Form>
                <div className="w-full flex flex-col">
                  <label htmlFor="input-field">input-w 100%</label>
                  <Controls.Input
                    id="input-field"
                    name="inputField"
                    placeholder="Placeholder"
                    textColor="text-blue-50"
                    placeholderColor="placeholder-blue-400"
                    value={values.inputField}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="dropDown">drop down-w100%</label>
                  <Controls.Select
                    id="dropDown"
                    name="dropDown"
                    defaultValue="initial value"
                    options={options}
                    value={values.dropDown}
                    onChange={handleInputChange}
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer error="error message error message error message error message">
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
              <Button
                title="w-100% Negative"
                className="col-span-2"
                colorType="bg-orange-300"
                hoverColorType="hover:bg-orange-400"
              />
            </Modal.Footer>
          </div>
          {/* Showing Part 4 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="All mix" />
            <Modal.Body>
              <p>{demoMessage}</p>
              <br />
              <Form>
                <div className="w-full flex flex-col">
                  <label htmlFor="input-field">input-w 100%</label>
                  <Controls.Input
                    id="input-field"
                    name="inputField"
                    placeholder="Placeholder"
                    textColor="text-blue-50"
                    placeholderColor="placeholder-blue-400"
                    value={values.inputField}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="dropDown">drop down-w100%</label>
                  <Controls.Select
                    id="dropDown"
                    name="dropDown"
                    defaultValue="initial value"
                    options={options}
                    value={values.dropDown}
                    onChange={handleInputChange}
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer error="error message error message error message error message">
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
              <Button
                title="w-100% Negative"
                className="col-span-2"
                colorType="bg-orange-300"
                hoverColorType="hover:bg-orange-400"
              />
            </Modal.Footer>
          </div>
          {/* Dialog-Component-2 END */}
          <h1 className="font-bold text-lg">Dialog-Component-3 START</h1>
          {/**
           *
           * Dialog Component-3
           * 01/06/2022
           *
           */}
          {/* Dialog-Component-3 START */}
          {/* Showing Part 1 */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Bottom button w-50% Positive 2 lines MIX" />
            <Modal.Body></Modal.Body>
            <Modal.Footer error="error message error message error message error message">
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
              <Button
                title="w-100% Negative"
                className="col-span-2"
                colorType="bg-orange-300"
                hoverColorType="hover:bg-orange-400"
              />
            </Modal.Footer>
          </div>
          {/* Showing Part 2 Note */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Bottom button w-50% Positive 2 lines MIX With Note" />
            <Modal.Body>
              <div className="w-full  flex flex-col">
                <label htmlFor="memo">メモ（2048文字まで）</label>
                <Controls.Textarea
                  name="memo"
                  id="memo"
                  rows="8"
                  resize="false"
                  maxLength="2048"
                />
              </div>
            </Modal.Body>
            <Modal.Footer error="error message error message error message error message">
              <Button title="w-50% Positive" />
              <Button title="w-50% Positive" />
              <Button
                title="w-100% Negative"
                className="col-span-2"
                colorType="bg-orange-300"
                hoverColorType="hover:bg-orange-400"
              />
            </Modal.Footer>
          </div>
          {/* Showing Part 3 FORM*/}
          <div className="content-1440 flex-container">
            <Modal.Title title="FORM W100%" />
            <Modal.Body>
              <Form>
                <div className="w-full flex flex-col">
                  <label htmlFor="input-field">input-w 100%</label>
                  <Controls.Input
                    id="input-field"
                    name="inputField"
                    placeholder="Placeholder"
                    textColor="text-blue-50"
                    placeholderColor="placeholder-blue-400"
                    value={values.inputField}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="dropDown">drop down-w100%</label>
                  <Controls.Select
                    id="dropDown"
                    name="dropDown"
                    defaultValue="initial value"
                    options={options}
                    value={values.dropDown}
                    onChange={handleInputChange}
                  />
                </div>
              </Form>
            </Modal.Body>
          </div>
          {/* Showing Part 4 Checkbox */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Checkbox list (can be nested)" />
            <Modal.Body>
              {/* First Parent */}
              <div className="mb-4">
                <Controls.Checkbox
                  label="parent 1st list(https://www.tagindex.com/stylesheet/list/margin_padding2.html)"
                  value="parent 1st"
                  name="parent_1st"
                />
                <div className="w-full pl-24 mt-3">
                  <div className="grid grid-cols-1 gap-2">
                    <Controls.Checkbox
                      label="parent 1st list -> child 1st list"
                      value="1st list"
                      name="1st_list"
                    />
                    <Controls.Checkbox
                      label="parent 1st list -> 2nd list"
                      value="2nd list"
                      name="2nd_list"
                    />
                  </div>
                </div>
              </div>
              {/* Second Parent */}
              <div className="mb-4">
                <Controls.Checkbox
                  label="parent 2nd list"
                  value="parent 2nd"
                  name="parent_2nd"
                />
                <div className="w-full pl-24 mt-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <Controls.Checkbox
                        label="parent 2nd list -> child 1st list"
                        value="parent 2nd 1st list"
                        name="parent_2nd_1st_list"
                      />
                      <div className="w-full pl-24 mt-3">
                        <Controls.Checkbox
                          label="parent 2nd list -> child 1st list"
                          value="parent 2nd 1st list"
                          name="parent_2nd_1st_list"
                        />
                      </div>
                    </div>
                    <Controls.Checkbox
                      label="parent 2nd list -> child 2nd list"
                      value="Parent 2nd list 2nd"
                      name="Parent_2nd_list_2nd"
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
          {/* Showing Part 5 Calendar */}
          <div className="content-1440 flex-container">
            <Modal.Title title="Date picker" />
            <Modal.Body>
              {/* 
              <h1>Hello Date</h1>
              <TableControls.CalendarSection2>
              </TableControls.CalendarSection2> 
              */}
            </Modal.Body>
          </div>
          {/* Dialog-Component-3 END */}
        </div>
      </div>
    </>
  );
}
