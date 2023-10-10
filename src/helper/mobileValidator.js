export default function mobileValidator(phoneNumber)
{
    const isInteger = /^\d+$/.test(phoneNumber);
    const hasSpecificLength = phoneNumber.length === 10;
    console.log(isInteger,hasSpecificLength)
    if (!phoneNumber) return "Mobile Number can't be empty."
    if (!isInteger||!hasSpecificLength) return "Please Enter Valid Mobile Number"
    return ''
}