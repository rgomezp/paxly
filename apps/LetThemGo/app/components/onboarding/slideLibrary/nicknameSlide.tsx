import NameInput from "@/components/NameInput"

type NicknameSlideProps = {
  onSelection?: () => void
  refreshNickname: () => void
}

export function nicknameSlide({ onSelection, refreshNickname }: NicknameSlideProps) {
  return {
    id: "name_input",
    title: "Let's get started!",
    description: "What should we call you?",
    component: (
      <NameInput
        showTitle={false}
        onSelection={() => {
          refreshNickname()
          onSelection?.()
        }}
      />
    ),
  }
}
