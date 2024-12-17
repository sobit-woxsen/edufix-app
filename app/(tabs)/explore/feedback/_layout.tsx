import { Stack } from "expo-router";

export default function FeedbackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Feedback",
        }}
      />
      <Stack.Screen
        name="all-feedbacks"
        options={{
          title: "Feedbacks",
        }}
      />
      <Stack.Screen
        name="feedback-form"
        options={{
          title: "Feedback Form",
        }}
      />
    </Stack>
  );
}
