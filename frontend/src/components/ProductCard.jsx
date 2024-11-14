import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { IoTrash } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "./ui/dialog";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (success) {
      toaster.create({
        title: message,
        type: "success",
      });
    } else {
      toaster.create({
        title: message,
        type: "error",
      });
    }
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    setOpen(false);
    if (success) {
      toaster.create({
        title: message,
        type: "success",
      });
    } else {
      toaster.create({
        title: message,
        type: "error",
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton onClick={() => setOpen(true)} bgColor={"cyan.500"}>
            <BsPencilSquare />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteProduct(product._id)}
            bgColor={"red.500"}
          >
            <IoTrash />
          </IconButton>
        </HStack>
      </Box>

      <DialogRoot
        placement="center"
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogContent>
          <DialogHeader>Update Product</DialogHeader>
          <DialogBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </DialogBody>

          <DialogFooter>
            <Button
              bgColor="cyan.500"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductCard;
