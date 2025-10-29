import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

const TelegramBot = () => {
  return (
    <div>
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>This appears on invoices and emails.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
            <FieldDescription>This appears on invoices and emails.</FieldDescription>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Switch id="newsletter" />
            <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export default TelegramBot;
