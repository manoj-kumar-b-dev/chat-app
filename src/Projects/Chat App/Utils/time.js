export default function formatTime(timeStamp)
{
  const date=new Date(timeStamp);
  const minutes=String(date.getMinutes()).padStart(2,"0");//for example 9min len=1 1<2 so true it adds 0 at starting of the string
  const hours=String(date.getHours()).padStart(2,"0");
  return `${hours}:${minutes}`

}
