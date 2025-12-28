import { ForwardedRef, forwardRef, ReactElement, RefObject } from "react"
import { FlashList, FlashListProps } from "@shopify/flash-list"

export type ListViewRef<T> = FlashList<T>
export type ListViewProps<T> = FlashListProps<T>

/**
 * A wrapper component for FlashList that provides a consistent interface.
 * @param {FlashListProps} props - The props for the `ListView` component.
 * @param {RefObject<ListViewRef>} forwardRef - An optional forwarded ref.
 * @returns {JSX.Element} The rendered `ListView` component.
 */
const ListViewComponent = forwardRef(
  <T,>(props: ListViewProps<T>, ref: ForwardedRef<ListViewRef<T>>) => {
    return <FlashList {...props} ref={ref} />
  },
)

ListViewComponent.displayName = "ListView"

export const ListView = ListViewComponent as <T>(
  props: ListViewProps<T> & {
    ref?: RefObject<ListViewRef<T>>
  },
) => ReactElement
