import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextArea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/products.create',
    },
];

export default function ProductForm() {
    // props inside useForm
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        featured_image: null as File | null,
    });

    //submit handler
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('products.store'), {
            onSuccess: () => console.log('Form submitted'),
        });
        console.log('data', data);
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('featured_image', e.target.files[0]);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl border p-4">
                <div className="ml-auto">
                    <Link
                        as="button"
                        className="text-md w-fit cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                        href={route('products.index')}
                    >
                        Back to Products
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4" autoComplete="off">
                            <div className="grid gap-6">
                                {/* Product Name*/}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Product Name"
                                        autoFocus
                                        tabIndex={1}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Product Description*/}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>

                                    <CustomTextArea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        id="description"
                                        name="description"
                                        placeholder="Product Description"
                                        autoFocus
                                        tabIndex={2}
                                        rows={3}
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                {/* Product Price*/}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Price</Label>
                                    <Input
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        id="price"
                                        name="price"
                                        type="text"
                                        placeholder="Product Price"
                                        autoFocus
                                        tabIndex={3}
                                    />
                                    <InputError message={errors.price} />
                                </div>

                                {/* Product Featured Image*/}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Featured Image</Label>
                                    <Input
                                        onChange={handleFileUpload}
                                        id="featured_image"
                                        name="featured_image"
                                        type="file"
                                        placeholder="Product Featured Image"
                                        autoFocus
                                        tabIndex={4}
                                    />
                                    <InputError message={errors.featured_image} />
                                </div>
                                {/* Submit Button */}
                                <Button type="submit" className="mt-4 w-fit cursor-pointer" tabIndex={4}>
                                    {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                                    Save Product
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
