import React from 'react';
import Button from '../../../Button/Button';
import InputContainer from '../../../Wrapper/InputContainer';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import CustomerFieldSettingTable from './CustomerFieldSettingTable';
import SystemFieldSettingTable from './SystemFieldSettingTable';

export default function CSVImportModal({ title, handleCancel }) {
    return (
        <>
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                {/*this is the modal title section*/}
                <ModalTitle className="text-blue-100 bold text-xl" title={title ? title : 'Modal Title'} />
                <InputContainer>
                    <label className="text-blue-100">CSVサンプル（毎回最新のサンプルをダウンロードしてください）</label>
                    <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                        <button type="button" className="w-full cursor-pointer">
                            最新サンプルCSVダウンロード
                        </button>
                    </div>
                </InputContainer>
                <InputContainer>
                    <label className="text-blue-100">CSVアップロード（サンプルの最初の２行は消さないでください）</label>
                    <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                        <button type="button" className="w-full cursor-pointer">
                            CSVファイルアップロード
                        </button>
                    </div>
                </InputContainer>
                <InputContainer>
                    <label className="text-blue-100">CSVファイル情報</label>
                    <div className="pl-10">
                        <div className="grid grid-cols-12 gap-1 mb-1 text-blue-100">
                            <div className="col-span-1">
                                <p>ファイル名</p>
                            </div>
                            <div className="col-span-11">
                                <p>user_list_20220920.csv</p>
                            </div>

                            <div className="col-span-1">
                                <p>ファイル容量</p>
                            </div>
                            <div className="col-span-11">
                                <p>256.22MB</p>
                            </div>

                            <div className="col-span-1">
                                <p>ファイル行数</p>
                            </div>
                            <div className="col-span-11">
                                <p>23456行</p>
                            </div>

                            <div className="col-span-1">
                                <p>ファイル列数</p>
                            </div>
                            <div className="col-span-11">
                                <p>12列</p>
                            </div>

                            <div className="col-span-12">
                                <p className="text-orange-600">
                                    エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ
                                </p>
                            </div>
                        </div>
                    </div>
                </InputContainer>

                {/* TABLE SECTION START */}
                <InputContainer>
                    {/* System field settings */}
                    <label className="text-blue-100">システムフィールド設定</label>
                    <CustomerFieldSettingTable />
                </InputContainer>
                <InputContainer>
                    {/* Custom field settings */}
                    <label className="text-blue-100">カスタムフィールド設定</label>
                    <SystemFieldSettingTable />
                </InputContainer>
                {/* TABLE SECTION END */}

                <InputContainer>
                    <label className="text-blue-100">CSVプレビュー（３００件のプレビューができます）</label>
                    <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                        <button type="button" className="w-full cursor-pointer">
                            プレビュー
                        </button>
                    </div>
                </InputContainer>
                <InputContainer>
                    <label className="text-blue-100">CSVインポート</label>
                    <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                        <button type="button" className="w-full cursor-pointer">
                            インポート実⾏
                        </button>
                    </div>
                </InputContainer>

                {/*  */}
                <InputContainer>
                    <Button
                        title="閉じる"
                        className="bg-blue-100 mt-10"
                        hoverColorType="hover:bg-blue-300"
                        type="button"
                        onClick={handleCancel}
                    />
                </InputContainer>
            </WhiteModalWrapper>
        </>
    );
}
