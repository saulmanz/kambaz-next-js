import { redirect } from "next/navigation";

export default async function People({ params, }: { params: Promise<{ cid: string }>; }) {
 const { cid } = await params;
 redirect(`/Courses/${cid}/People/Table`);
}
