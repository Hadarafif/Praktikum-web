<?php

namespace app\Controller;

include "app/Traits/ApiResponseFormatter.php";
include "app/Models/Product.php";

use app\Models\Product;
use app\Traits\ApiResponseFormatter;

class ProductController
{
    use ApiResponseFormatter;

    public function index()
    {
        $productModel = new Product();
        $response = $productModel->findAll();

        return $this->apiResponse(200, "success", $response);
    }

    public function getById($id)
    {
        $productModel = new Product();
        $response = $productModel->findById($id);
        
        return $this->apiResponse(200, "success", $response);
    }

    public function insert()
    {

        $jsonInput = file_get_contents("php://input");
        $inputData = json_decode($jsonInput, true);

        if (!isset($inputData['product_name'])) {
            return $this->apiResponse(400, "Error: Invalid input", null);
        }

        $productModel = new Product();
        $response = $productModel->create($inputData);
        
        return $this->apiResponse(200, "success", $response);
    }

    public function update($id)
    {
        $jsonInput = file_get_contents("php://input");
        $inputData = json_decode($jsonInput, true);

        if (!isset($inputData['product_name'])) {
            return $this->apiResponse(400, "Error: Invalid input", null);
        }

        $productModel = new Product();
        $response = $productModel->update($inputData, $id);
        
        return $this->apiResponse(200, "success", $response);
    }

    public function delete($id)
    {
        $productModel = new Product();
        $response = $productModel->delete($id);
        
        return $this->apiResponse(200, "success", $response);
    }
}