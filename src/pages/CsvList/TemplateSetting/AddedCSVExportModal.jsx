import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import ModalFormFooter from '../../../components/Footer/ModalFormFooter';
import SelectBox from '../../../components/Form/FormInputs/SelectBox';
import TextBox from '../../../components/Form/FormInputs/TextBox';
import Loading from '../../../components/Loading/Loader';
import TagBoxComponent from '../../../components/ManagementItem/TagBoxComponent';
import ModalTitle from '../../../components/Modal/components/ModalTitle';
import WhiteModalWrapper from '../../../components/Modal/components/WhiteModalWrapper';
import DialogModal from '../../../components/Modal/DialogModal';
import FormBodyContainer from '../../../components/Wrapper/FormBodyContainer';
import InputContainer from '../../../components/Wrapper/InputContainer';
import useGetListWithPID from '../../../hooks/useGetListWithPID';
import commonConstants from '../../../lib/commonConstants';
import { errorMessages } from '../../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../../lib/getErrorMessageWithErrorCode';
import { csvExportSettingModal } from '../../../lib/Schema';
import {
  baseURL,
  createMethod, csvExportTemplateCreate, csvExportTemplateDelete, csvExportTemplateUpdate, deleteMethod,
  listField,
  listFilter,
  listMethod, listRoles, updateMethod
} from '../../../restapi/queries';
import { instance } from '../../../services/axios';
import CsvGenerationComponent from './CsvGenerationComponent';
import CsvOutputField from './CsvOutputField';
import { CSV_DELETION_OPTION } from './dataService';
import FormFooter from '../../../components/Form/FormFooter';

const selectOptions = [
  { id: 0, value: '制限しない' }, //7
  { id: 1, value: '制限する' },
];

// formik onChange function will show everything in form
const FormObserver = ({ setTagShow }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    const { limitType } = values;
    setTagShow && setTagShow(limitType === '1' || limitType == 1);
  }, [values]);
  return null;
};

export default function AddedCSVExportModal({
  handleCancel,
  initialValues,
  title = 'Set Title',
  formType = 'add',
  setIsOverflow,
}) {
  // console.log('initialValues', initialValues);
  const processing = useRef(false);
  const { info } = useSelector((state) => state.auth);
  const pathname = window.location.pathname;
  const routeName = pathname.split("/").pop();
  const projectId = sessionStorage.getItem("currentProjectId");
  const [loading, setLoading] = useState(false);
  const [loadingDragApp, setLoadingDragApp] = useState(true);
  const [systemError, setSystemError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [tagShow, setTagShow] = useState(initialValues.limitType == 1);
  const [functionMode, setFunctionMode] = useState({ mode: "", item: {} });
  const [roleTagRecords, setRoleTagRecords] = useState(
    initialValues?.csvExportTemplateAuthRole
  );
  const [copyModal, setCopyModal] = useState(false);
  const [systemErrorCopy, setSystemErrorCopy] = useState(false);

  // Fetching All Filter Lists for selecting filter
  const { records: filterRecords, fetchLoading: loadingFilter } =
    useGetListWithPID({
      info: {
        projectId: projectId,
        baseURL: baseURL,
        listURL: listFilter,
        listMethod: listMethod,
        shouldGetRecord: true,
      },
    });


  // Fetching All Field Lists for selecting field
  const { records: fieldRecords, fetchLoading: loadingField } =
    useGetListWithPID({
      info: {
        projectId: projectId,
        baseURL: baseURL,
        listURL: listField,
        listMethod: listMethod,
        shouldGetRecord: true,
        fieldType: "0,1,2,3,4,5,6,7",
      },
    });

  // Fetching All Field Lists for selecting field
  const { records: fieldRecords2, fetchLoading: loadingField2 } =
    useGetListWithPID({
      info: {
        projectId: projectId,
        baseURL: baseURL,
        listURL: listField,
        listMethod: listMethod,
        shouldGetRecord: true,
        fieldType: "10",
      },
    });

  // Fetching All Role Lists for selecting role
  const { records: roleRecords, fetchLoading: loadingRole } = useGetListWithPID(
    {
      info: {
        projectId: projectId,
        baseURL: baseURL,
        listURL: listRoles,
        listMethod: listMethod,
        shouldGetRecord: true,
      },
    }
  );

  useEffect(() => {
    const roleTag = sessionStorage.getItem(
      `routeName_timestamp_${routeName}_roleTag_${projectId}`
    );
    if (roleTag) {
      setRoleTagRecords(JSON.parse(roleTag)); // roleTag_
    }
  }, [tagShow]);
  useEffect(() => {
    sessionStorage.removeItem(
      `routeName_timestamp_${routeName}_roleTag_${projectId}`
    );
  }, [formType, fieldRecords]);


  // copy operation
  const handleCopy = () => {
    setCopyModal(true);
  };

  // Handle Copy Project
  const handleCopyProject = async () => {
    if (processing.current) return;
    processing.current = true;
    setLoading(true);
    setSystemErrorCopy(false);
    try {
      const pid = sessionStorage.getItem("currentProjectId");
      const csvExportTemplateId = sessionStorage.getItem('csv_export_setting_edit');
      const ENDPOINT = `${baseURL}${csvExportTemplateCreate}${csvExportTemplateId}?pid=${pid}`;
      const config = {
        method: createMethod,
        url: ENDPOINT,
        data: {
          createdBy: info.accountId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const copied = await instance.request(config);

      // if copy is successful
      if (copied) {
        setSystemErrorCopy(false);
        setLoading(false);
      }
      handleCancel();
    } catch (error) {
      // if (error.response.status === 409) {
      //     setSystemErrorCopy(false);
      // } else {
      console.warn('SYSTEM ERROR: ', error);
      setSystemErrorCopy(true);
      setLoading(false);
      // }
      setLoading(false);
    } finally {
      processing.current = false;
    }
  };

  const handleAdd = async (values, resetForm) => {
    if (processing.current) return;
    processing.current = true;
    setLoading(true);
    setSystemError(false);

    let csvExportTemplateAuthRole;
    if (values.limitType == "1") {
      const roleTag = sessionStorage.getItem(
        `routeName_timestamp_${routeName}_roleTag_${projectId}`
      );
      if (roleTag) {
        csvExportTemplateAuthRole = roleTag;
      } else {
        csvExportTemplateAuthRole = [];
      }
    } else {
      csvExportTemplateAuthRole = null;
    }
    try {
      const pid = sessionStorage.getItem("currentProjectId");
      const ENDPOINT = `${baseURL}${csvExportTemplateCreate}?pid=${pid}`;
      const config = {
        method: createMethod,
        url: ENDPOINT,
        data: {
          projectId: Number(projectId),
          csvExportTemplateName: values.csvExportTemplateName,
          csvExportTemplateFileName: values.csvExportTemplateFileName,
          csvExportTemplateGenerationCycle:
            values.csvExportTemplateGenerationCycle,
          csvExportTemplateGenerationTiming:
            +values.csvExportTemplateGenerationTiming,
          csvExportTemplateAutomaticDeletion:
            +values.csvExportTemplateAutomaticDeletion,
          csvExportTemplatePassword: values.csvExportTemplatePassword,
          csvExportTemplateColumn: sessionStorage.getItem(`${routeName}_drag`),
          filterId: Number(values.filterId),
          csvExportTemplateAuthRole: csvExportTemplateAuthRole,
          memo: values.memo,
          createdBy: info.accountId,
          updatedBy: info.accountId,
        },
      };
      const created = await instance.request(config);
      // if create is successful
      if (created) {
        setSystemError(false);
        setLoading(false);
        resetForm({ [values]: "" });
        handleCancel();
        sessionStorage.removeItem(`${routeName}_drag_F_Type`);
        sessionStorage.removeItem(`${routeName}_drag`);
      }
      sessionStorage.removeItem(
        `routeName_timestamp_${routeName}_roleTag_${projectId}`
      );
    } catch (error) {
      setSystemError(true);
      setLoading(false);
    } finally {
      processing.current = false;
    }
  };

  // Update Csv Export Template
  const handleUpdate = async (values) => {
    if (processing.current) return;
    processing.current = true;
    setLoading(true);
    setSystemError(false);
    let csvExportTemplateAuthRole;
    if (values.limitType == "1") {
      const roleTag = sessionStorage.getItem(
        `routeName_timestamp_${routeName}_roleTag_${projectId}`
      );
      if (roleTag) {
        csvExportTemplateAuthRole = roleTag;
      } else {
        csvExportTemplateAuthRole = null;
      }
    } else {
      csvExportTemplateAuthRole = null;
    }
    try {
      const ENDPOINT = `${baseURL}${csvExportTemplateUpdate}${values.csvExportTemplateId}`;
      const config = {
        method: updateMethod,
        url: ENDPOINT,
        data: {
          projectId: Number(projectId),
          csvExportTemplateName: values.csvExportTemplateName,
          csvExportTemplateFileName: values.csvExportTemplateFileName,
          csvExportTemplateGenerationCycle:
            values.csvExportTemplateGenerationCycle,
          csvExportTemplateGenerationTiming:
            +values.csvExportTemplateGenerationTiming,
          csvExportTemplateAutomaticDeletion:
            +values.csvExportTemplateAutomaticDeletion,
          csvExportTemplatePassword: values.csvExportTemplatePassword,
          csvExportTemplateColumn: sessionStorage.getItem(`${routeName}_drag`),
          filterId: Number(values.filterId),
          csvExportTemplateAuthRole: csvExportTemplateAuthRole,
          memo: values.memo,
          createdBy: info.accountId,
          updatedBy: info.accountId,
        },
      };
      const created = await instance.request(config);
      // if updated is successful
      if (created) {
        setSystemError(false);
        setLoading(false);
        handleCancel();
        sessionStorage.removeItem(`${routeName}_drag_F_Type`);
        sessionStorage.removeItem(`${routeName}_drag`);
      }
      sessionStorage.removeItem(
        `routeName_timestamp_${routeName}_roleTag_${projectId}`
      );
    } catch (error) {
      setSystemError(true);
      setLoading(false);
    } finally {
      processing.current = false;
    }
  };
  // Delete CSV Export template
  const handleDelete = async (values) => {
    if (processing.current) return;
    processing.current = true;
    setLoading(true);
    setSystemError(false);
    setDeleteError(false);
    try {
      const ENDPOINT = `${baseURL}${csvExportTemplateDelete}${values.csvExportTemplateId}?pid=${projectId}`;
      const config = {
        method: deleteMethod,
        url: ENDPOINT,
        data: {
          deletedBy: info.accountId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const deleted = await instance.request(config);

      // if delete is successful
      if (deleted) {
        setSystemError(false);
        setLoading(false);
        handleCancel();
      }
      sessionStorage.removeItem(
        `routeName_timestamp_${routeName}_roleTag_${projectId}`
      );
    } catch (error) {
      const matchErrorMessage = getErrorMessageWithErrorCode(error);
      setDeleteError(true);
      setDeleteErrorMessage(matchErrorMessage);
      setLoading(false);
    } finally {
      processing.current = false;
    }
  };

  const closeDialogModal = () => {
    sessionStorage.removeItem(
      `routeName_timestamp_${routeName}_roleTag_${projectId}`
    );
    setOpenDeleteModal(false);
    setDeleteError(false);
    setIsOverflow(false);
  };

  return (
    <>
      {(loadingField || loadingField2 || loadingFilter || loadingDragApp || loading) && <Loading />}
      <WhiteModalWrapper width="border-none text-black" className="items-start">
        {/*this is the modal title section*/}
        <ModalTitle className="text-blue-100 bold text-xl" title={title} />
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={csvExportSettingModal}
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (formType === "add") {
              handleAdd(values, resetForm);
            } else {
              handleUpdate(values);
            }
          }}
        >
          {({ errors, setFieldValue }) => {
            const first = Object.keys(errors)[0];
            return (
              <div className="relative w-full h-full">
                <FormObserver setTagShow={setTagShow} />
                <Form>
                  <div className="-mt-4" id="scroller"></div>
                  <FormBodyContainer className="!px-0">
                    <div>
                      <InputContainer>
                        <TextBox
                          label="CSV出力テンプレート名"
                          labelClassName="text-blue-100"
                          inputClassName="bg-blue-25 placeholder-blue-100"
                          placeholder="CSV出力テンプレート名"
                          name="csvExportTemplateName"
                          type="text"
                          isRequired
                        />
                      </InputContainer>
                      <InputContainer>
                        <TextBox
                          label="CSV出力ファイル名"
                          labelClassName="text-blue-100"
                          inputClassName="bg-blue-25 placeholder-blue-100"
                          placeholder="CSV出力ファイル名"
                          name="csvExportTemplateFileName"
                          type="text"
                          isRequired
                        />
                      </InputContainer>

                      <CsvGenerationComponent
                        setFieldValue={setFieldValue}
                        csvExportTemplateGenerationCycle={
                          initialValues.csvExportTemplateGenerationCycle
                        }
                        csvExportTemplateGenerationTiming={
                          initialValues.csvExportTemplateGenerationTiming
                        }
                      />
                      <InputContainer>
                        {/* CSV automatic deletion setting */}
                        <SelectBox
                          label="CSV自動削除設定"
                          inputClassName="bg-transparent text-blue-100"
                          labelClassName="text-blue-100"
                          border="border-unset border-b-[1px]"
                          name="csvExportTemplateAutomaticDeletion"
                        >
                          {CSV_DELETION_OPTION.length > 0 &&
                            CSV_DELETION_OPTION.map((option, index) => (
                              <option value={option.id} key={option.id}>
                                {option.value}
                              </option>
                            ))}
                        </SelectBox>
                      </InputContainer>
                      <InputContainer>
                        {/* ZIP password setting (the password of the generated ZIP will not be changed) */}
                        <TextBox
                          label="ZIPパスワード設定（生成済みのZIPのパスワードは変更されません）"
                          labelClassName="text-blue-100"
                          inputClassName="bg-blue-25 placeholder-blue-100"
                          placeholder="ZIPパスワード"
                          name="csvExportTemplatePassword"
                        // isRequired
                        />
                      </InputContainer>
                      <InputContainer>
                        {/* CSV filter settings */}
                        <SelectBox
                          label="CSVフィルター設定"
                          inputClassName="bg-transparent text-blue-100"
                          labelClassName="text-blue-100"
                          border="border-unset border-b-[1px]"
                          name="filterId"
                        >
                          <option key="default" value="">
                            {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                              "CSVフィルター設定"
                            )}
                          </option>
                          {filterRecords.length > 0 &&
                            filterRecords.map((filter) => (
                              <option
                                value={filter.filterId}
                                key={filter.filterId}
                              >
                                {filter.filterName}
                              </option>
                            ))}
                        </SelectBox>
                      </InputContainer>
                      <InputContainer className="py-10">
                        {/* CSV output field */}
                        <CsvOutputField
                          infoText={{
                            buttonFTypeName: 'CSV出力フィールド追加',
                            dragAppCSVTitle: 'CSV出力フィールド',
                            inputBoxHeader: 'フィールド',
                            openEditPencilModal: 'csvExport',
                          }}
                          stateInfoCsvImport={{}}
                          fieldRecords={fieldRecords}
                          fieldRecords2={fieldRecords2}
                          filterRecords={filterRecords}
                          initialValues={initialValues}
                          setLoading={setLoadingDragApp}
                          formType={formType}
                        />
                      </InputContainer>

                      <InputContainer>
                        <SelectBox
                          label="このテンプレートを利用可能なロール"
                          inputClassName="bg-transparent text-blue-100"
                          labelClassName="text-blue-100"
                          border="border-unset border-b-[1px]"
                          name="limitType"
                        >
                          {selectOptions.length > 0 &&
                            selectOptions.map((role) => (
                              <option value={role.id} key={role.id}>
                                {role.value}
                              </option>
                            ))}
                        </SelectBox>
                        {tagShow && (
                          <InputContainer className="px-20 mt-4">
                            <label className="text-blue-100">
                              利用可能なロールを選択してください
                            </label>
                            <div className="area-tagbox-component">
                              <TagBoxComponent
                                dragList={roleRecords}
                                displayExpr="roleName"
                                valueExpr="roleId"
                                count={`${routeName}_roleTag_${projectId}`}
                                preDefineTagBoxValue={
                                  initialValues?.csvExportTemplateAuthRole &&
                                    initialValues?.csvExportTemplateAuthRole
                                      .length > 0
                                    ? initialValues?.csvExportTemplateAuthRole
                                    : roleTagRecords
                                }
                                functionMode={functionMode}
                              />
                            </div>
                          </InputContainer>
                        )}
                      </InputContainer>
                    </div>
                    {/* <ModalFormFooter
                      padding="!p-0"
                      btn_title1={`${
                        formType === "add"
                          ? "キャンセル"
                          : "CSV出力テンプレート削除"
                      }`}
                      btn_title2={`${formType === "add" ? "保存" : "更新"}`}
                      formType={formType}
                      handleCancel={handleCancel}
                      setOpenModal={setOpenDeleteModal}
                      setIsOverFlow={setIsOverflow}
                      memoClassName="!text-blue-100"
                      buttonComponents={true}
                      setContinuousAdd={() => {}}
                      deleteLoading={deleteLoading} 
                    >*/}
                    {/* ----error---- */}
                    {/* <ErrorMessage>
                        {errors[first]}
                        {systemError &&
                          !errors[first] &&
                          `${errorMessages.E_SYSTEM_01}`}
                      </ErrorMessage>
                    </ModalFormFooter> */}


                    <FormFooter
                      btn_title1={formType === 'add' ? '保存' : 'CSV出力テンプレート削除'}
                      btn_title2={formType === 'add' ? '保存' : '更新'}
                      btn_title3={'キャンセル'}
                      btn_title4="複製"
                      continuousAddRemove
                      buttonComponents={true}
                      handleCancel={handleCancel}
                      formType={formType}
                      loading={loading}
                      setOpenModal={setOpenDeleteModal}
                      deleteLoading={deleteLoading}
                      handleCopy={handleCopy}
                      setIsOverFlow={setIsOverflow}
                      setContinuousAdd={() => { }}
                    >
                      {/* ----error---- */}
                      <ErrorMessage>
                        {errors[first]}
                        {systemError &&
                            !errors[first] &&
                            `${errorMessages.E_SYSTEM_01}`}
                      </ErrorMessage>
                    </FormFooter>
                  </FormBodyContainer>
                </Form>
                {openDeleteModal && (
                  <DialogModal
                    title="削除"
                    btn_title="削除"
                    cancel_title="キャンセル"
                    handleButtonLeft={handleDelete}
                    handleButtonRight={closeDialogModal}
                    setIsOverFlow={setIsOverflow}
                    values={initialValues}
                    errors={
                      <span
                        className={`${deleteError && errors[first]
                          } ? "visible" : "invisible"`}
                      >
                        {deleteError &&
                          deleteErrorMessage &&
                          `${deleteErrorMessage}`}
                      </span>
                    }
                  >
                    <div className="text-center mt-[1rem]">
                      <p>選択したデータを削除します。</p>
                      <div className="text-orange-500 mt-[1rem]">
                        削除したデータは復元できません。
                      </div>
                    </div>
                  </DialogModal>
                )}

                {copyModal && (
                  <DialogModal
                    title="複製"
                    btn_title="キャンセル"
                    cancel_title="複製"
                    handleButtonLeft={() => {
                      setCopyModal(false);
                    }}
                    colorType="bg-blue-100"
                    handleButtonRight={handleCopyProject}
                    errors={
                      <span className={`${errors[first]} ? "visible" : "invisible"`}>
                        {systemErrorCopy &&
                          !errors[first] &&
                          `${errorMessages.E_SYSTEM_01}`}
                      </span>
                    }
                  >
                    <div className="text-center mt-[1rem]">
                      <p>選択したデータを複製します。</p>
                    </div>
                  </DialogModal>
                )}
              </div>
            );
          }}
        </Formik>
      </WhiteModalWrapper>
    </>
  );
}
