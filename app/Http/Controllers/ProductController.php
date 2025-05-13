<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { //map just to format the date
        $products = Product::latest()->get()->map(fn($product) => [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'featured_image' => $product->featured_image,
            'featured_image_original_name' => $product->featured_image_original_name,
            'featured_image_url' => $product->featured_image
                ? asset('storage/' . $product->featured_image)
                : null,
            'created_at' => $product->created_at->format('d M Y'),
        ]); // get products list
        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     */

    //inject the product form request for validation
    public function store(ProductFormRequest $request)
    {
        try {
            $featuredImage = null;
            $featuredImageOriginalName = null; //its important to declare this null to prevent undefined variables
            //
            if ($request->file('featured_image')) {
                $featuredImage = $request->file('featured_image');
                $featuredImageOriginalName = $featuredImage->getClientOriginalName();
                $featuredImage = $featuredImage->store('products', 'public'); //upload image to public folder
            }

            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'featured_image' => $featuredImage,
                'featured_image_original_name' => $featuredImageOriginalName,
            ]);

            if ($product) {
                return redirect()->route('products.index')->with('success', 'Product created successfully');
            }


            return redirect()->route('products.index')->with('error', 'Unable to create, try again later');
        } catch (Exception $e) {
            Log::error('Product creation failed: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isView' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductFormRequest $request, Product $product)
    {
        try {
            Log::info('Update method reached!');
            Log::info('Featured Image Received:', [
                'hasFile' => $request->hasFile('featured_image'),
                'file' => $request->file('featured_image'),
                'all' => $request->all(), // Check all form data
            ]);

            if ($product) {
                $product->name = $request->name;
                $product->description = $request->description;
                $product->price = $request->price;

                if ($request->file('featured_image')) {
                    $featuredImage = $request->file('featured_image');
                    $featuredImageOriginalName = $featuredImage->getClientOriginalName();
                    $featuredImage = $featuredImage->store('products', 'public'); //upload image to public folder

                    $product->featured_image = $featuredImage;
                    $product->featured_image_original_name =  $featuredImageOriginalName;
                }
                $product->save();
                return redirect()->route('products.index')->with('success', 'product updated!');
            }
            return redirect()->back()->with('error', 'try again!');
        } catch (Exception $e) {
            Log::error('Product update failed: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            if ($product) {
                $product->delete();

                return redirect()->back()->with('success', 'product deleted successfully!');
            }
            return redirect()->back()->with('error', 'unable to delete product!');
        } catch (Exception $e) {
            Log::error('Product deletion failed: ' . $e->getMessage());
        }
    }
}
