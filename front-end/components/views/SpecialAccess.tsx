"use client";

import Blocker from "@/components/shared/Blocker";
import { useWalletStore } from "@/store/wallet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccessItem from "../special-access/AccessItem";

interface SpecialAccessProps {
  ongoing: Access[];
  passed: Access[];
  mine: Access[];
}

const SpecialAccess = ({ ongoing, mine, passed }: SpecialAccessProps) => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full items-start justify-start min-h-screen">
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
                {ongoing.map((item, idx) => (
                  <AccessItem
                    key={idx}
                    id={item._id}
                    image={item.image}
                    price={item.price}
                    sold={item.sold}
                    total={item.total}
                    title={item.title}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="passed" className="pt-5">
              <div className="flex flex-col w-full h-full items-center justify-start space-y-4">
                {passed.map((item, idx) => (
                  <AccessItem
                    key={idx}
                    id={item._id}
                    image={item.image}
                    price={item.price}
                    sold={item.sold}
                    total={item.total}
                    title={item.title}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="claimed" className="pt-5">
              <div className="flex flex-col w-full h-full items-center justify-start space-y-4">
                {mine.map((item, idx) => (
                  <AccessItem
                    key={idx}
                    id={item._id}
                    image={item.image}
                    price={item.price}
                    sold={item.sold}
                    total={item.total}
                    title={item.title}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default SpecialAccess;
