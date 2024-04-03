import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog } from "primereact/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { robotFormSchema } from "@/lib/validators"; // Assuming you have a schema for the robot form
import { zodResolver } from "@hookform/resolvers/zod";
import { robotDefaultValues } from "@/constants"; // Assuming you have default values for robot form
import { Button as PButton } from "primereact/button";
import { createRobot, updateRobot } from "@/lib/actions/robot.actions"; // Assuming you have actions for creating and updating robots
import { Input } from "@/components/ui/input";
import { SymbolComboBox } from "@/components/common/SymbolComboBox"; // Assuming you have a SymbolComboBox component
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common/Spinner";
import { cn } from "@/lib/utils";
import { useSocket } from "@/context/SocketContext";
import { IRobot } from "@/types";

const RobotModal = ({
  visible,
  setVisible,
  robot,
  type,
}: {
  visible: boolean;
  setVisible: () => void;
  robot?: IRobot | null;
  type: string;
}) => {
  console.log(robot);
  const { user } = useSocket();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues =
    robot && type === "Update" ? { ...robot } : robotDefaultValues; // Use default values for new robot or current robot values for update
  console.log("Initial values: ", initialValues);
  const form = useForm<z.infer<typeof robotFormSchema>>({
    resolver: zodResolver(robotFormSchema),
    defaultValues: initialValues as z.infer<typeof robotFormSchema>,
  });

  async function onSubmit(values: z.infer<typeof robotFormSchema>) {
    setIsSubmitting(true);
    if (type === "Create") {
      try {
        const newRobot = await createRobot({
          robotData: { ...values },
          userId: user?._id,
          path: "/robots",
        });

        if (newRobot) {
          form.reset();
          setVisible();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }

    if (type === "Update") {
      if (!robot?._id) {
        return;
      }

      try {
        const updatedRobot = await updateRobot({
          userId: user?._id,
          robotId: robot._id,
          robotData: { ...values, _id: robot._id },
          path: `/robots`,
        });

        if (updatedRobot) {
          form.reset();
          setVisible();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <Dialog
      header="Robot Details"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={setVisible}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5">
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="active"
                        className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Active
                      </label>
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="active"
                        className="mr-2 h-6 w-6 border-2 border-primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? <Spinner /> : `Submit`}
          </Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default RobotModal;
