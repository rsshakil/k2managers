import TabsComponent from "../TabsComponent/TabsComponent";

const AppDesignLeft = ({ loading }) => {

    return (
        <div className="w-[640px] left-0 z-50 bg-blue-150 custom-shadow2">
            <div className="mx-auto w-[640px]">
                <div className="flex flex-col items-center justify-center w-full">
                    <TabsComponent loading={loading} />
                </div>
            </div>
        </div>
    )
}
export default AppDesignLeft