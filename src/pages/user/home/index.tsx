import { Fragment } from "react";
import { Carousel } from "react-responsive-carousel";

const HomePage = () => {
  return (
    <Fragment>
      <section className="h-[600px]">
        <div className="container mx-auto">
          <Carousel className="h-[600px]">
            <div>
              <img
                className="w-full h-1/4"
                src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
              />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img
                className="w-full h-1/4"
                src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"
              />
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img
                className="w-full h-1/4"
                src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
              />
              <p className="legend">Legend 3</p>
            </div>
          </Carousel>
        </div>
      </section>
      <section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        provident repudiandae delectus laboriosam expedita dolore vel! Quod
        molestias facilis eum. Amet quis dignissimos porro voluptatum ab veniam.
        Officiis voluptatibus sed dolorum cum corporis animi harum commodi, odio
        labore obcaecati iusto veniam? Voluptatum, obcaecati aliquam. Cum iste
        asperiores ut! Id, libero aperiam iure numquam exercitationem maxime
        provident amet fugit ut accusamus odit hic rerum repudiandae ratione et
        quas incidunt officiis nesciunt nemo voluptatem quibusdam deserunt
        fugiat voluptates est! Quia laboriosam quasi unde deleniti enim. Itaque
        mollitia iusto sint soluta, fugit nam consequatur, dolore optio officiis
        quod inventore possimus quo adipisci. Voluptate.
      </section>
    </Fragment>
  );
};

export default HomePage;
