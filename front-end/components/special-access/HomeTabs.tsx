import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccessItem from "./AccessItem";

const HomeTabs = () => {
  return (
    <Tabs defaultValue="ongoing" className="w-full py-5">
      <TabsList className="grid w-full grid-cols-3 bg-primary-100 border border-brand-base">
        <TabsTrigger
          value="ongoing"
          className="data-[state=active]:bg-primary-80 data-[state=active]:text-neutral-base text-neutral-base/70 rounded-lg p-1"
        >
          On Going
        </TabsTrigger>
        <TabsTrigger
          value="passed"
          className="data-[state=active]:bg-primary-80 data-[state=active]:text-neutral-base text-neutral-base/70 rounded-lg p-1"
        >
          Passed
        </TabsTrigger>
        <TabsTrigger
          value="claimed"
          className="data-[state=active]:bg-primary-80 data-[state=active]:text-neutral-base text-neutral-base/70 rounded-lg p-1"
        >
          Claimed
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ongoing" className="pt-5">
        <div className="flex flex-col w-full h-full items-center justify-start space-y-4">
          <AccessItem
            id={"1"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={12}
            total={100}
            title="CoinFest Asia Ticket"
          />
          <AccessItem
            id={"2"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={12}
            total={100}
            title="CoinFest Asia Ticket"
          />
          <AccessItem
            id={"3"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={12}
            total={100}
            title="CoinFest Asia Ticket"
          />
        </div>
      </TabsContent>
      <TabsContent value="passed" className="pt-5">
        <div className="flex flex-col w-full h-full items-center justify-start space-y-4">
          <AccessItem
            id={"1"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={100}
            total={100}
            title="CoinFest Asia Ticket"
            className="opacity-50"
          />
          <AccessItem
            id={"2"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={100}
            total={100}
            title="CoinFest Asia Ticket"
            className="opacity-50"
          />
          <AccessItem
            id={"3"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={100}
            total={100}
            title="CoinFest Asia Ticket"
            className="opacity-50 bg-primary-100"
          />
        </div>
      </TabsContent>
      <TabsContent value="claimed" className="pt-5">
        <div className="flex flex-col w-full h-full items-center justify-start space-y-4">
          <AccessItem
            id={"1"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={12}
            total={100}
            title="CoinFest Asia Ticket"
          />
          <AccessItem
            id={"2"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={12}
            total={100}
            title="CoinFest Asia Ticket"
          />
          <AccessItem
            id={"3"}
            image="/images/dummy-1.jpg"
            price={1}
            sold={12}
            total={100}
            title="CoinFest Asia Ticket"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default HomeTabs;
